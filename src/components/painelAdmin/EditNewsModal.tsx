"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/uiPainel/button";
import { Input } from "@/components/ui/uiPainel/input";
import { Label } from "@/components/ui/uiPainel/label";
import { Textarea } from "@/components/ui/uiPainel/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/uiPainel/select";
import { X, Loader2, Edit } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { News } from "@/types/NewsPanel";
import useEditNews from "@/hooks/useEditNews";

const NEWS_TYPES = [
  { value: "noticia", label: "📰 Notícia" },
  { value: "cronica", label: "📝 Crônica" },
  { value: "poema", label: "✍️ Poema" },
  { value: "tirinha", label: "🎨 Tirinha" },
];

interface EditNewsModalProps {
  news: News;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditNewsModal({
  news,
  onClose,
  onSuccess,
}: EditNewsModalProps) {
  const { submit, editLoading } = useEditNews();

  const [newsType, setNewsType] = useState<string>(news.newstype);
  const [summary, setSummary] = useState(news.summary);
  const [author, setAuthor] = useState(news.author);
  const [body, setBody] = useState(news.body);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newsType || !summary.trim() || !author.trim() || !body.trim()) {
      toastError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      submit(
        {
          ...news,
          newstype: newsType,
          summary,
          author,
          body,
        },
        news.id,
      );
      toastSuccess("As alterações foram salvas com sucesso");

      onSuccess();
    } catch (error) {
      toastError(error instanceof Error ? error.message : "Tente novamente");
    } finally {
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-xl p-6 shadow-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Edit className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">
                Editar Notícia
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="edit-newsType"
                className="text-accent font-medium"
              >
                Tipo *
              </Label>
              <Select value={newsType} onValueChange={setNewsType}>
                <SelectTrigger className="bg-input border-border focus:border-accent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-accent font-medium">
                Título
              </Label>
              <Input
                id="edit-title"
                value={news.title}
                disabled
                className="bg-muted border-border cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                O título não pode ser editado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-summary" className="text-accent font-medium">
                Resumo *
              </Label>
              <Textarea
                id="edit-summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                disabled={editLoading}
                className="bg-input border-border focus:border-accent min-h-24 resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-author" className="text-accent font-medium">
                Autor *
              </Label>
              <Input
                id="edit-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={editLoading}
                className="bg-input border-border focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-body" className="text-accent font-medium">
                Corpo do texto *
              </Label>
              <Textarea
                id="edit-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={editLoading}
                className="bg-input border-border focus:border-accent min-h-40 resize-y"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={editLoading}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11"
              >
                {editLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                disabled={editLoading}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
