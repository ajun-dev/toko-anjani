import getBanner from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  {
    /* Ganti banner id:
    const banner = await getBanner("")
    dibawah dengan salah satu Id banner toko */
  }
  const banner = await getBanner("8b722dd3-1049-4e34-abb4-20bf2f3a35f8");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Banner data={banner} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Produk Pilihan" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
