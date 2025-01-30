import { notFound } from "next/navigation";

export const generateStaticParams = () => {
  return [];
};

export default function NotFoundCatchAll() {
  notFound();
}