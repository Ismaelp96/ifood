type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductsPage({ params: { id } }: ProductPageProps) {
  return <div>Product Page {id}</div>;
}
