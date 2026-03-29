import Spinner from "@/components/ui/loaders/Spinner/page";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <Spinner size={100} circleColor="#4b6b57" partialCircleColor="#91a98f" />
      <h1 className="text-2xl">Carregando...</h1>
    </div>
  )
}