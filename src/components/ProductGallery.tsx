import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ZoomIn, ZoomOut, Maximize2, X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  dossard?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  dossard
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});

  // Hover zoom states (survol loupe)
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mainImageContainerRef = useRef<HTMLDivElement>(null);

  // Fullscreen modal states (clic agrandissement)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalPan, setModalPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const validImages = images && images.length > 0 ? images : [''];

  const handleImageError = (index: number) => {
    setHasError(prev => ({ ...prev, [index]: true }));
  };

  // Gestion du survol avec coordonnées relatives pour l'effet loupe
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageContainerRef.current) return;
    const rect = mainImageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Clavier & Verrouillage du scroll en mode agrandi
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(prev => (prev + 1) % validImages.length);
        setModalPan({ x: 0, y: 0 });
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev - 1 + validImages.length) % validImages.length);
        setModalPan({ x: 0, y: 0 });
      } else if (e.key === '+' || e.key === '=') {
        setModalZoom(prev => Math.min(3, prev + 0.5));
      } else if (e.key === '-') {
        setModalZoom(prev => Math.max(1, prev - 0.5));
      } else if (e.key === '0') {
        setModalZoom(1);
        setModalPan({ x: 0, y: 0 });
      }
    },
    [isFullscreen, validImages.length]
  );

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setModalZoom(1);
      setModalPan({ x: 0, y: 0 });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, handleKeyDown]);

  // Pan / Drag en mode zoom modal
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalZoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - modalPan.x,
      y: e.clientY - modalPan.y
    };
  };

  const handleModalMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || modalZoom <= 1) return;
    setModalPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleModalZoom = () => {
    if (modalZoom === 1) {
      setModalZoom(2);
    } else if (modalZoom === 2) {
      setModalZoom(3);
    } else {
      setModalZoom(1);
      setModalPan({ x: 0, y: 0 });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Miniatures cliquables (horizontales sur mobile, verticales sur desktop) */}
      <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto no-scrollbar md:w-24 py-1 md:py-0">
        {validImages.map((img, idx) => {
          const isActive = idx === activeIndex;
          const isError = hasError[idx];

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setModalPan({ x: 0, y: 0 });
              }}
              className={`thumb-btn w-16 md:w-24 aspect-[4/5] bg-surface border overflow-hidden focus:outline-none transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'border-ink opacity-100 ring-2 ring-ink ring-offset-2'
                  : 'border-surface opacity-70 hover:opacity-100'
              }`}
              aria-label={`Afficher la vue ${idx + 1} de ${productName}`}
            >
              {!isError && img ? (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(idx)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-muted">
                  0{idx + 1}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Image principale au ratio 4/5 avec survol loupe et clic agrandissement */}
      <div
        ref={mainImageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFullscreen(true)}
        className="flex-1 aspect-[4/5] bg-surface border border-surface overflow-hidden relative group cursor-crosshair select-none"
        role="button"
        tabIndex={0}
        aria-label={`Agrandir la vue détaillée de ${productName} (Vue ${activeIndex + 1} sur ${validImages.length})`}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFullscreen(true);
          }
        }}
      >
        {!hasError[activeIndex] && validImages[activeIndex] ? (
          <>
            <img
              id="main-product-image"
              src={validImages[activeIndex]}
              alt={`${productName} — Vue détaillée`}
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isHovered ? 'scale(2.25)' : 'scale(1)',
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.25s ease-out'
              }}
              className="w-full h-full object-cover will-change-transform"
              onError={() => handleImageError(activeIndex)}
            />

            {/* Réticule et repères graphiques éditoriaux au survol */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-150 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              {/* Lignes de visée coordonnées */}
              <div
                className="absolute inset-x-0 border-t border-ink/20 pointer-events-none"
                style={{ top: `${mousePos.y}%` }}
              />
              <div
                className="absolute inset-y-0 border-l border-ink/20 pointer-events-none"
                style={{ left: `${mousePos.x}%` }}
              />

              {/* Télémétrie technique en bas à gauche */}
              <div className="absolute bottom-3 left-3 bg-ink text-bg font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold border border-ink/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-alert inline-block animate-pulse" />
                <span>INSPECTION 2.25X</span>
                <span className="text-muted/80">
                  X:{Math.round(mousePos.x)}% Y:{Math.round(mousePos.y)}%
                </span>
              </div>
            </div>

            {/* Bouton d'action explicite en haut à droite */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="bg-bg/95 backdrop-blur-xs text-ink font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-ink shadow-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={12} className="text-alert" />
                <span>Agrandir</span>
              </span>
            </div>

            {/* Indicateur discret d'index en haut à gauche */}
            <div className="absolute top-3 left-3">
              <span className="bg-ink text-bg font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                0{activeIndex + 1} / 0{validImages.length}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-surface select-none">
            <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold mb-2">
              {productName}
            </span>
            <span className="font-mono text-[11px] text-muted">Aperçu laboratoire</span>
          </div>
        )}
      </div>

      {/* MODAL PLEIN ÉCRAN : AGRANDISSEMENT AU DÉTAIL & INSPECTION TECHNIQUE */}
      {isFullscreen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Détail haute résolution — ${productName}`}
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col justify-between text-bg animate-fadeIn"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setIsFullscreen(false);
            }
          }}
        >
          {/* Barre supérieure : Métadonnées éditoriales, contrôles de zoom et fermeture */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-4 border-b border-surface/30 bg-ink/95 shrink-0 z-10">
            <div className="flex items-center gap-3">
              {dossard && (
                <span className="font-mono text-xs font-bold px-2 py-0.5 border border-surface text-surface uppercase">
                  {dossard}
                </span>
              )}
              <div>
                <p className="font-display font-black text-lg md:text-xl uppercase tracking-wider leading-none">
                  {productName}
                </p>
                <p className="font-mono text-[11px] text-muted tracking-tight mt-0.5">
                  LABORATOIRE // INSPECTION DU DÉTAIL — VUE 0{activeIndex + 1} / 0{validImages.length}
                </p>
              </div>
            </div>

            {/* Outils de zoom */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-surface/40 bg-surface/10 p-0.5">
                <button
                  type="button"
                  onClick={() => setModalZoom(prev => Math.max(1, prev - 0.5))}
                  disabled={modalZoom <= 1}
                  className="p-1.5 hover:bg-surface/30 disabled:opacity-30 disabled:cursor-not-allowed text-bg transition-colors cursor-pointer"
                  title="Réduire le zoom (-)"
                  aria-label="Réduire le zoom"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="font-mono text-xs font-bold px-2 min-w-[50px] text-center select-none text-alert">
                  {modalZoom.toFixed(1)}X
                </span>
                <button
                  type="button"
                  onClick={() => setModalZoom(prev => Math.min(3, prev + 0.5))}
                  disabled={modalZoom >= 3}
                  className="p-1.5 hover:bg-surface/30 disabled:opacity-30 disabled:cursor-not-allowed text-bg transition-colors cursor-pointer"
                  title="Augmenter le zoom (+)"
                  aria-label="Augmenter le zoom"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              {/* Raccourcis rapides 1X, 2X, 3X */}
              <div className="hidden md:flex items-center gap-1 font-mono text-xs">
                {[1, 2, 3].map(scale => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => {
                      setModalZoom(scale);
                      if (scale === 1) setModalPan({ x: 0, y: 0 });
                    }}
                    className={`px-2 py-1 border transition-colors cursor-pointer ${
                      modalZoom === scale
                        ? 'bg-alert text-ink border-alert font-bold'
                        : 'border-surface/40 hover:border-surface text-surface'
                    }`}
                  >
                    {scale}X
                  </button>
                ))}
              </div>

              {modalZoom > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setModalZoom(1);
                    setModalPan({ x: 0, y: 0 });
                  }}
                  className="hidden sm:inline-flex items-center gap-1 border border-surface/40 px-2.5 py-1 font-mono text-xs hover:bg-surface/20 transition-colors cursor-pointer"
                  title="Réinitialiser (0)"
                >
                  <RotateCcw size={12} />
                  <span>Réinitialiser</span>
                </button>
              )}

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-2 bg-alert hover:opacity-95 text-ink font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 border border-alert transition-transform active:scale-95 cursor-pointer"
                aria-label="Fermer l'agrandissement"
              >
                <span>Fermer</span>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Zone centrale d'affichage de l'image agrandie */}
          <div
            ref={modalContentRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleModalMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`relative flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8 select-none ${
              modalZoom > 1
                ? isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
          >
            {/* Flèche précédente */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setActiveIndex(prev => (prev - 1 + validImages.length) % validImages.length);
                setModalPan({ x: 0, y: 0 });
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-ink/80 hover:bg-alert hover:text-ink text-bg border border-surface/40 p-3 transition-colors cursor-pointer"
              aria-label="Vue précédente"
              title="Précédent (Flèche gauche)"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Conteneur d'image avec pan & zoom */}
            <div
              onClick={toggleModalZoom}
              className="max-w-full max-h-full flex items-center justify-center transition-transform"
              style={{
                transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalZoom})`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img
                src={validImages[activeIndex]}
                alt={`${productName} — Vue haute définition ${activeIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-[90vw] object-contain border border-surface/30 shadow-2xl pointer-events-auto"
                draggable={false}
              />
            </div>

            {/* Flèche suivante */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setActiveIndex(prev => (prev + 1) % validImages.length);
                setModalPan({ x: 0, y: 0 });
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-ink/80 hover:bg-alert hover:text-ink text-bg border border-surface/40 p-3 transition-colors cursor-pointer"
              aria-label="Vue suivante"
              title="Suivant (Flèche droite)"
            >
              <ChevronRight size={24} />
            </button>

            {/* Légende d'aide interactive discrète */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
              <span className="font-mono text-[11px] text-surface/70 bg-ink/80 border border-surface/30 px-2.5 py-1">
                {modalZoom > 1
                  ? 'Glisser pour explorer la texture • Clic pour basculer'
                  : 'Clic pour zoomer 2X • Raccourcis : [←] [→] [+ / -] [Échap]'}
              </span>
            </div>
          </div>

          {/* Bande inférieure : Sélecteur de miniatures en bas de la modal */}
          <div className="px-4 md:px-8 py-3 border-t border-surface/30 bg-ink/95 flex items-center justify-center gap-3 shrink-0 z-10 overflow-x-auto no-scrollbar">
            {validImages.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setModalPan({ x: 0, y: 0 });
                  }}
                  className={`w-14 h-16 bg-surface/20 border overflow-hidden transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-alert ring-2 ring-alert ring-offset-2 ring-offset-ink opacity-100 scale-105'
                      : 'border-surface/40 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Aller à la vue 0${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
