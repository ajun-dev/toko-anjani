import db from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Layers, Image as ImageIcon, Plus, TrendingUp, Clock } from "lucide-react";

const DashboardPage = async ({ 
  params 
}: {
  params: Promise<{ storeId: string }>
}) => {
  const { storeId } = await params;

  // Get store data
  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  // Get statistics
  const totalProducts = await db.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });

  const totalCategories = await db.category.count({
    where: {
      storeId: storeId,
    },
  });

  const totalBanners = await db.banner.count({
    where: {
      storeId: storeId,
    },
  });

  const archivedProducts = await db.product.count({
    where: {
      storeId: storeId,
      isArchived: true,
    },
  });

  // Get recent products with category
  const recentProducts = await db.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  // Get featured products
  const featuredProducts = await db.product.findMany({
    where: {
      storeId: storeId,
      isFeatured: true,
      isArchived: false,
    },
    take: 5,
  });

  // Get recent categories with their banners
  const recentCategories = await db.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Produk Aktif</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {archivedProducts > 0 && `+${archivedProducts} archived`}
              </p>
            </CardContent>
          </Card>

          {/* Total Categories */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
              <Layers className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Kategori tersedia
              </p>
            </CardContent>
          </Card>

          {/* Total Banners */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Banner</CardTitle>
              <ImageIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBanners}</div>
              <p className="text-xs text-muted-foreground">
                Banner aktif
              </p>
            </CardContent>
          </Card>

          {/* Featured Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produk Featured</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredProducts.length}</div>
              <p className="text-xs text-muted-foreground">
                Produk unggulan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href={`/${storeId}/products`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </Link>
            <Link href={`/${storeId}/categories`}>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kategori
              </Button>
            </Link>
            <Link href={`/${storeId}/banners`}>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Banner
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Products */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Produk Terbaru</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {recentProducts.length > 0 ? (
                <div className="space-y-3">
                  {recentProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-start justify-between py-2 border-b last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {product.category?.name || "No Category"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Belum ada produk</p>
                </div>
              )}
              <Link href={`/${storeId}/products`} className="block mt-4">
                <Button variant="outline" className="w-full text-xs" size="sm">
                  Lihat Semua Produk →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Featured Products */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Produk Featured</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              {featuredProducts.length > 0 ? (
                <div className="space-y-3">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="flex items-start justify-between py-2 border-b last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Rp {Number(product.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded whitespace-nowrap">
                        Featured
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Tidak ada produk featured</p>
                </div>
              )}
              <Link href={`/${storeId}/products`} className="block mt-4">
                <Button variant="outline" className="w-full text-xs" size="sm">
                  Kelola Produk →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Categories */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Kategori</CardTitle>
                <Layers className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              {recentCategories.length > 0 ? (
                <div className="space-y-3">
                  {recentCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {category._count.products} produk
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(category.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Belum ada kategori</p>
                </div>
              )}
              <Link href={`/${storeId}/categories`} className="block mt-4">
                <Button variant="outline" className="w-full text-xs" size="sm">
                  Kelola Kategori →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
