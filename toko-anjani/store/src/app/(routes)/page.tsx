import getBanners from "@/actions/get-banners";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const banners = await getBanners();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {banners.length > 0 && (
          <div className="flex flex-col gap-4">
            {banners.map((banner) => (
              <Banner key={banner.id} data={banner} />
            ))}
          </div>
        )}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Produk Pilihan" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
