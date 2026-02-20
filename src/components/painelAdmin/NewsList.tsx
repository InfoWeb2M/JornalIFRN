'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/uiPainel/button";
import { Loader2, Trash2, Edit, Copy, List as ListIcon } from "lucide-react";
import { News } from "@/types/NewsPanel";
import { catalogActions } from "@/actions/CatalogActions/catalogActions";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { EditNewsModal } from "./EditNewsModal";
import { NEWS_TYPE_ICONS } from "@/constants/NewsTypes";
import { deleteNewsActions } from "@/actions/DeleteNews/deleteNewsActions";

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await catalogActions();
      setNews(data);
    } catch (error) {
      toastError(error instanceof Error ? error.message : "Tente novamente");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta notícia?")) return;

    try {
      await deleteNewsActions(id);
      setNews((prev) => prev.filter((n) => n.id !== id));
      toastError("A notícia foi deletada com sucesso");
    } catch (error) {
      toastError(error instanceof Error ? error.message : "Tente novamente");
    }
  };

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      toastSuccess("O ID foi copiado para a área de transferência");
    } catch {
      toastError("Não foi possível copiar o ID");
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 shadow-card flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-muted-foreground">Carregando notícias...</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 shadow-card text-center">
        <ListIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-xl text-foreground font-medium mb-2">
          Nenhuma notícia encontrada
        </p>
        <p className="text-muted-foreground">
          Crie sua primeira notícia na aba &quot;Criar&quot;
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl p-6 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <ListIcon className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">
            Notícias ({news.length})
          </h2>
        </div>

        <div className="space-y-4">
          {news.map((item, index) => (
         
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-input border border-border rounded-lg p-4 hover:border-accent transition-all"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {item.arquivos[0].image1 && (
                  <img
                    src={
                      item.arquivos[0].image1.startsWith("http")
                        ? item.arquivos[0].image1
                        : `/api${item.arquivos[0].image1}`
                    }
                    alt={item.title}
                    className="w-full md:w-40 h-40 object-cover rounded-lg shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent">
                      {NEWS_TYPE_ICONS[item.newstype]} {item.newstype}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {item.summary}
                  </p>

                  <p className="text-xs text-accent mb-4">Por {item.author}</p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setEditingNews(item)}
                      size="sm"
                      className="scale-anim bg-accent hover:bg-[#c5e3bb] text-accent-foreground gap-2 cursor-pointer border-2 border-accent hover:border-[#c5e3bb]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </Button>

                    <Button
                      onClick={() => handleDelete(item.id)}
                      size="sm"
                      variant="destructive"
                      className="scale-anim gap-2 cursor-pointer border-[#dc2828] border-2 hover:bg-red-700 hover:border-red-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </Button>

                    <Button
                      onClick={() => handleCopyId(item.id)}
                      size="sm"
                      variant="outline"
                      className="scale-anim gap-2 border-border hover:border-accent hover:bg-accent/5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copiar ID
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {editingNews && (
        <EditNewsModal
          news={editingNews}
          onClose={() => setEditingNews(null)}
          onSuccess={() => {
            setEditingNews(null);
            loadNews();
          }}
        />
      )}
    </>
  );
};

export default NewsList;
