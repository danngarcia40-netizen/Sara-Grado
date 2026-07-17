import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

export default function MedicalArkanoid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const animationRef = useRef<number>(0);

  // Game state refs (to avoid re-renders on every frame)
  const gameState = useRef({
    x: 0,
    y: 0,
    dx: 4,
    dy: -4,
    paddleX: 0,
    rightPressed: false,
    leftPressed: false,
    bricks: [] as { x: number; y: number; status: number }[],
    score: 0,
    isGameOver: false,
    isWin: false,
  });

  // Game constants
  const ballRadius = 8;
  const paddleHeight = 12;
  const paddleWidth = 100;
  const brickRowCount = 4;
  const brickColumnCount = 6;
  const brickWidth = 80;
  const brickHeight = 24;
  const brickPadding = 12;
  const brickOffsetTop = 40;
  const brickOffsetLeft = 0; // calculated dynamically

  const initGame = (canvas: HTMLCanvasElement) => {
    gameState.current.x = canvas.width / 2;
    gameState.current.y = canvas.height - 30;
    gameState.current.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    gameState.current.dy = -4;
    gameState.current.paddleX = (canvas.width - paddleWidth) / 2;
    gameState.current.score = 0;
    gameState.current.isGameOver = false;
    gameState.current.isWin = false;
    setGameOver(false);
    setWin(false);

    // Initialize bricks
    const bricks = [];
    const totalBrickWidth = (brickColumnCount * (brickWidth + brickPadding)) - brickPadding;
    const offsetLeft = (canvas.width - totalBrickWidth) / 2;
    
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        bricks.push({
          x: c * (brickWidth + brickPadding) + offsetLeft,
          y: r * (brickHeight + brickPadding) + brickOffsetTop,
          status: 1
        });
      }
    }
    gameState.current.bricks = bricks;
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = gameState.current;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#D4AF37"; // Gold color for the ball (like a golden pill)
    ctx.fill();
    ctx.closePath();
    
    // Slight glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#D4AF37";
  };

  const drawPaddle = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { paddleX } = gameState.current;
    
    // Draw a capsule (pill) like paddle
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight - 15, paddleWidth / 2, paddleHeight, { tl: 10, bl: 10, tr: 0, br: 0 });
    ctx.fillStyle = "#2E7D5A"; // Medical Green side
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.roundRect(paddleX + paddleWidth / 2, canvas.height - paddleHeight - 15, paddleWidth / 2, paddleHeight, { tl: 0, bl: 0, tr: 10, br: 10 });
    ctx.fillStyle = "#FFFFFF"; // White side
    ctx.fill();
    ctx.closePath();
    
    // Shine effect
    ctx.beginPath();
    ctx.roundRect(paddleX + 5, canvas.height - paddleHeight - 13, paddleWidth - 10, paddleHeight / 3, 5);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
    ctx.closePath();
  };

  const drawBricks = (ctx: CanvasRenderingContext2D) => {
    // Colors for different rows to make it colorful
    const colors = ["#E57373", "#4FC3F7", "#D4AF37", "#81C784"]; 
    const types = ["virus", "bacteria", "pill", "cell"];

    gameState.current.bricks.forEach((b, index) => {
      if (b.status === 1) {
        const row = Math.floor(index / brickColumnCount);
        const color = colors[row % colors.length];
        const type = types[row % types.length];
        
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, brickWidth, brickHeight, 6);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Shine
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.roundRect(b.x + 2, b.y + 2, brickWidth - 4, brickHeight / 2 - 2, 4);
        ctx.fill();
        ctx.closePath();

        // Medical details inside bricks
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        if (type === "virus") {
          // Cross
          ctx.fillRect(b.x + brickWidth/2 - 2, b.y + brickHeight/2 - 6, 4, 12);
          ctx.fillRect(b.x + brickWidth/2 - 6, b.y + brickHeight/2 - 2, 12, 4);
        } else if (type === "bacteria") {
          // Dots
          ctx.beginPath();
          ctx.arc(b.x + brickWidth/2 - 10, b.y + brickHeight/2, 3, 0, Math.PI*2);
          ctx.arc(b.x + brickWidth/2 + 10, b.y + brickHeight/2, 3, 0, Math.PI*2);
          ctx.fill();
        } else if (type === "pill") {
          // Line
          ctx.fillRect(b.x + brickWidth/2 - 1, b.y + 4, 2, brickHeight - 8);
        } else {
          // Single dot
          ctx.beginPath();
          ctx.arc(b.x + brickWidth/2, b.y + brickHeight/2, 4, 0, Math.PI*2);
          ctx.fill();
        }
        
      }
    });
  };

  const collisionDetection = () => {
    const { x, y } = gameState.current;
    
    for (let i = 0; i < gameState.current.bricks.length; i++) {
      const b = gameState.current.bricks[i];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          gameState.current.dy = -gameState.current.dy;
          b.status = 0;
          gameState.current.score++;
          
          if (gameState.current.score === brickRowCount * brickColumnCount) {
            gameState.current.isWin = true;
            setWin(true);
            setIsPlaying(false);
          }
        }
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background pattern
    ctx.fillStyle = "rgba(46, 125, 90, 0.02)";
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.fillRect(i, 0, 1, canvas.height);
    }

    drawBricks(ctx);
    drawBall(ctx);
    drawPaddle(ctx, canvas);
    collisionDetection();

    // Score
    ctx.font = "14px Inter";
    ctx.fillStyle = "rgba(46, 125, 90, 0.6)";
    ctx.fillText("Virus erradicados: " + gameState.current.score, 20, 20);

    // Movement
    if (gameState.current.x + gameState.current.dx > canvas.width - ballRadius || gameState.current.x + gameState.current.dx < ballRadius) {
      gameState.current.dx = -gameState.current.dx;
    }
    if (gameState.current.y + gameState.current.dy < ballRadius) {
      gameState.current.dy = -gameState.current.dy;
    } else if (gameState.current.y + gameState.current.dy > canvas.height - ballRadius - 10) {
      if (gameState.current.x > gameState.current.paddleX && gameState.current.x < gameState.current.paddleX + paddleWidth) {
        // Add some angle depending on where it hits the paddle
        let hitPoint = gameState.current.x - (gameState.current.paddleX + paddleWidth/2);
        gameState.current.dx = hitPoint * 0.15;
        gameState.current.dy = -gameState.current.dy;
      } else if (gameState.current.y + gameState.current.dy > canvas.height - ballRadius) {
        gameState.current.isGameOver = true;
        setGameOver(true);
        setIsPlaying(false);
        return;
      }
    }

    gameState.current.x += gameState.current.dx;
    gameState.current.y += gameState.current.dy;

    if (gameState.current.rightPressed && gameState.current.paddleX < canvas.width - paddleWidth) {
      gameState.current.paddleX += 7;
    } else if (gameState.current.leftPressed && gameState.current.paddleX > 0) {
      gameState.current.paddleX -= 7;
    }

    if (!gameState.current.isGameOver && !gameState.current.isWin) {
      animationRef.current = requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") gameState.current.rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") gameState.current.leftPressed = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") gameState.current.rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") gameState.current.leftPressed = false;
    };
    
    // Mouse/Touch control for paddle
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if(relativeX > 0 && relativeX < canvas.width) {
        gameState.current.paddleX = relativeX - paddleWidth/2;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
      if(relativeX > 0 && relativeX < canvas.width) {
        gameState.current.paddleX = relativeX - paddleWidth/2;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (!gameState.current.bricks.length || gameState.current.isGameOver || gameState.current.isWin) {
        if(canvasRef.current) initGame(canvasRef.current);
      }
      animationRef.current = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  return (
    <section className="py-16 md:py-24 px-6 flex flex-col items-center justify-center bg-white relative">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-medical/20 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="font-sans text-gold text-sm tracking-widest uppercase mb-4 block">Mini Juego</span>
        <h2 className="font-sans text-3xl md:text-5xl text-gray-900 font-light tracking-wide">Erradicador de <span className="font-script text-5xl md:text-7xl text-medical font-normal ml-2 lowercase">Virus</span></h2>
        <p className="font-sans text-gray-500 text-sm md:text-base mt-6 max-w-md mx-auto leading-relaxed">Relájate un momento eliminando algunos virus. Usa las flechas de tu teclado o desliza el dedo en tu pantalla.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,125,90,0.15)] border-4 border-gray-50 bg-gradient-to-b from-gray-50 to-white"
      >
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          className="max-w-full block"
          style={{ width: '100%', maxWidth: '600px', height: 'auto', aspectRatio: '3/2' }}
        />
        
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-10"
            >
              {gameOver && (
                <div className="text-center mb-6">
                  <h3 className="font-sans text-4xl text-gray-800 mb-2 font-medium">¡Oh no!</h3>
                  <p className="text-gray-600 font-sans tracking-wide">El virus logró escapar.</p>
                </div>
              )}
              {win && (
                <div className="text-center mb-6 flex flex-col items-center">
                  <motion.img 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    src="https://i.pinimg.com/originals/30/8a/be/308abe81c5d0ba92120e2908f902dc67.png" 
                    alt="Dra Juguetes"
                    className="w-48 h-auto object-contain mx-auto mb-4 drop-shadow-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://m.media-amazon.com/images/I/71rB58hP0FL._AC_SL1500_.jpg';
                    }}
                  />
                  <h3 className="font-script text-6xl text-gold mb-2">¡Excelente!</h3>
                  <p className="text-medical font-sans tracking-widest uppercase text-sm font-semibold mb-6">Paciente libre de virus.</p>
                  
                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-gold text-white px-8 py-3 rounded-full transition-colors shadow-lg font-sans text-xs tracking-widest uppercase font-semibold"
                    >
                      Volver Arriba
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPlaying(true)}
                      className="bg-white text-medical border-2 border-medical px-8 py-3 rounded-full transition-colors shadow-lg font-sans text-xs tracking-widest uppercase font-semibold"
                    >
                      Jugar de Nuevo
                    </motion.button>
                  </div>
                </div>
              )}
              {!win && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-medical to-[#1f5e42] text-white px-10 py-4 rounded-full transition-colors shadow-lg shadow-medical/30 font-sans text-xs tracking-widest uppercase font-semibold mt-4"
                >
                  <Play size={18} />
                  {gameOver ? 'Jugar de nuevo' : 'Iniciar Juego'}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
