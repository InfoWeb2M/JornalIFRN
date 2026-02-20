"use client";

import { ToastType } from "@/types/toastType";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

class ToastManager {
  private container: HTMLDivElement | null = null;
  private toasts: Set<HTMLDivElement> = new Set();

  constructor() {
    this.createContainer();
    this.injectStyles();
  }

  private createContainer(): void {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  private getIcon(type: ToastType): string {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`
    };
    return icons[type];
  }

  private getTypeStyle(type: ToastType): string {
    const styles = {
      success: 'background: var(--botoes); color: var(--background);',
      error: 'background: var(--links); color: var(--background);',
      warning: 'background: var(--destaques); color: var(--foreground);',
      info: 'background: var(--cards); color: var(--text); border-color: var(--destaques);'
    };
    return styles[type];
  }

  public show(options: ToastOptions): void {
    const {
      message,
      type = 'info',
      duration = 4000,
      position = 'top-right'
    } = options;

    const toast = document.createElement('div');
    const typeStyle = this.getTypeStyle(type);
    
    toast.className = `toast toast-${type} toast-${position}`;
    toast.setAttribute('style', typeStyle);
    
    toast.innerHTML = `
      <div class="toast-icon">${this.getIcon(type)}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Fechar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => this.remove(toast));

    this.container?.appendChild(toast);
    this.toasts.add(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    if (duration > 0) {
      setTimeout(() => this.remove(toast), duration);
    }
  }

  private remove(toast: HTMLDivElement): void {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
      this.toasts.delete(toast);
    }, 300);
  }

  private injectStyles(): void {
    if (document.getElementById('toast-styles')) return;

    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-container {
        position: fixed;
        z-index: 10000;
        pointer-events: none;
      }

      .toast {
        position: fixed;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 50rem;
        max-width: 50rem;
        padding: 14px 18px;
        border: 2px solid var(--bordas);
        border-radius: 12px;
        box-shadow: var(--shadow);
        pointer-events: auto;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Libre Baskerville', serif;
        font-size: 15px;
        line-height: 1.5;
      }

      .toast-show {
        opacity: 1;
        transform: translateY(0);
      }

      .toast-hide {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }

      .toast-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        opacity: 0.95;
      }

      .toast-message {
        flex: 1;
        font-weight: 400;
        letter-spacing: 0.3px;
      }

      .toast-close {
        flex-shrink: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s ease, transform 0.2s ease;
        color: currentColor;
        border-radius: 4px;
      }

      .toast-close:hover {
        opacity: 1;
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.1);
      }

      .toast-close:active {
        transform: scale(0.95);
      }

      /* Posicionamento */
      .toast-top-right {
        top: 20px;
        right: 20px;
      }

      .toast-top-left {
        top: 20px;
        left: 20px;
      }

      .toast-bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .toast-bottom-left {
        bottom: 20px;
        left: 20px;
      }

      .toast-top-center {
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
      }

      .toast-top-center.toast-show {
        transform: translateX(-50%) translateY(0);
      }

      .toast-top-center.toast-hide {
        transform: translateX(-50%) translateY(-20px) scale(0.95);
      }

      .toast-bottom-center {
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
      }

      .toast-bottom-center.toast-show {
        transform: translateX(-50%) translateY(0);
      }

      .toast-bottom-center.toast-hide {
        transform: translateX(-50%) translateY(20px) scale(0.95);
      }

      /* Múltiplos toasts */
      .toast-top-right ~ .toast-top-right {
        top: calc(20px + var(--toast-offset, 0px));
      }

      .toast-top-left ~ .toast-top-left {
        top: calc(20px + var(--toast-offset, 0px));
      }

      .toast-bottom-right ~ .toast-bottom-right {
        bottom: calc(20px + var(--toast-offset, 0px));
      }

      .toast-bottom-left ~ .toast-bottom-left {
        bottom: calc(20px + var(--toast-offset, 0px));
      }

      /* Responsividade */
      @media (max-width: 640px) {
        .toast {
          min-width: calc(100vw - 40px);
          max-width: calc(100vw - 40px);
          left: 20px !important;
          right: 20px !important;
          transform: translateY(-20px) !important;
        }

        .toast-show {
          transform: translateY(0) !important;
        }

        .toast-hide {
          transform: translateY(-20px) scale(0.95) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  public success(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): void {
    this.show({ ...options, message, type: 'success' });
  }

  public error(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): void {
    this.show({ ...options, message, type: 'error' });
  }

  public warning(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): void {
    this.show({ ...options, message, type: 'warning' });
  }

  public info(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): void {
    this.show({ ...options, message, type: 'info' });
  }
}

let toastInstance: ToastManager | null = null;

function getToast(): ToastManager {
  if (typeof window === "undefined") {
    throw new Error("Toast só pode ser usado no client");
  }

  if (!toastInstance) {
    toastInstance = new ToastManager();
  }

  return toastInstance;
}

// Funções auxiliares para compatibilidade
export function toastSuccess(message: string, duration?: number): void {
  getToast()?.success(message, { duration, position: 'top-center' });
}

export function toastError(message: string, duration?: number): void {
  getToast()?.error(message, { duration, position: 'top-center' });
}

export function toastWarning(message: string, duration?: number): void {
  getToast()?.warning(message, { duration, position: 'top-center' });
}

export function toastInfo(message: string, duration?: number): void {
  getToast()?.info(message, { duration, position: 'top-center' });
}