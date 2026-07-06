"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchForm() {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const query = SearchParams.get("q") || "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const query = data.q;

    if (!query) {
      return;
    }

    router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // AJUSTE: w-full para mobile, md:w-[320px] para desktop.
      // Adicionado overflow-hidden e min-w-0 por precaução para o texto não vazar.
      className="flex w-full md:w-[320px] min-w-0 items-center gap-3 rounded-full bg-zinc-900 px-4 py-3 sm:px-5 ring-zinc-700 overflow-hidden"
    >
      <Search className="w-5 h-5 text-zinc-500 shrink-0" />
      <input
        type="text"
        name="q"
        defaultValue={query}
        placeholder="Buscar produtos..."
        // AJUSTE: min-w-0 junto com flex-1 garante que o input nunca passe do tamanho do form
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 min-w-0"
      />
    </form>
  );
}
