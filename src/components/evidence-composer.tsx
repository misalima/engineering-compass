"use client";

import { FormEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { IconClose, IconPlus } from "@/components/icons";

export function EvidenceComposer() {
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const titleId = useId();
  const typeId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeComposer = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeComposer();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeComposer, isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <div className="evidence-action">
        <button ref={triggerRef} className="primary-action" type="button" aria-describedby="evidence-requirement" onClick={() => { setIsOpen(true); setSaved(false); }}>
          <IconPlus className="icon" />
          Registrar evidência
        </button>
        <span className="evidence-requirement" id="evidence-requirement" role="note">
          Evidência esperada: explicação própria + exemplo aplicado.
        </span>
      </div>

      {isOpen ? (
        <div className="composer-backdrop" role="presentation" onMouseDown={closeComposer}>
          <aside
            ref={dialogRef}
            className="composer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="composer-title"
            aria-describedby="composer-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="composer-heading">
              <div>
                <h2 id="composer-title">Registrar evidência</h2>
                <p id="composer-description">Guarde um sinal concreto do que você aprendeu.</p>
              </div>
              <button className="icon-button" type="button" aria-label="Fechar" onClick={closeComposer}>
                <IconClose className="icon" />
              </button>
            </div>

            {saved ? (
              <div className="composer-success" role="status">
                <span className="success-mark">✓</span>
                <h3>Rascunho registrado nesta sessão</h3>
                <p>A persistência real será conectada em uma próxima etapa. Por enquanto, este fluxo demonstra a experiência planejada.</p>
                <button className="secondary-action" type="button" onClick={closeComposer}>Voltar ao painel</button>
              </div>
            ) : (
              <form className="composer-form" onSubmit={handleSubmit}>
                <label htmlFor={titleId}>O que demonstra seu aprendizado?</label>
                <input id={titleId} name="title" required placeholder="Ex.: expliquei consistência eventual com um caso real" />

                <label htmlFor={typeId}>Tipo de evidência</label>
                <select id={typeId} name="type" defaultValue="note">
                  <option value="note">Nota de estudo</option>
                  <option value="project">Projeto</option>
                  <option value="review">Revisão</option>
                  <option value="practice">Prática</option>
                </select>

                <label htmlFor="reflection">Reflexão curta <span>(opcional)</span></label>
                <textarea id="reflection" name="reflection" rows={5} placeholder="O que ficou claro? O que ainda precisa ser testado?" />

                <p className="form-note">Demonstração local — nenhum dado será persistido.</p>
                <button className="primary-action submit-action" type="submit">Salvar rascunho</button>
              </form>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}
