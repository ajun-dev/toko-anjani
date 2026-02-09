import getBanner from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  try {
    if (!process.env.PUBLIC_API_URL) {
      throw new Error("PUBLIC_API_URL environment variable is not set");
    }

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
          {banner && <Banner data={banner} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <ProductList title="Produk Pilihan" items={products} />
            ) : (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                <h2 className="text-lg font-semibold text-yellow-900">
                  Tidak ada produk pilihan saat ini
                </h2>
              </div>
            )}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error loading homepage data:", error);
    
    return (
      <Container>
        <div className="space-y-10 pb-10 py-10">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              ⚠️ Terjadi Kesalahan Koneksi
            </h1>
            <p className="text-red-800 mb-4">
              Gagal menghubungkan ke server. Silakan coba beberapa saat lagi.
            </p>
            <p className="text-sm text-red-700">
              Jika masalah berlanjut, silakan hubungi support.
            </p>
          </div>
        </div>
      </Container>
    );
  }
};

export default HomePage;
