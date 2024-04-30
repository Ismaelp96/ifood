import CategoryList from "@/components/category-list/category-list";
import HeaderComponent from "@/components/header";
import SearchComponent from "@/components/ui/search-component";
import BannerPromo from "@/components/banner-promo";

export default function Home() {
  return (
    <>
      <div className="container">
        <HeaderComponent />
        <SearchComponent />
        <CategoryList />
        <BannerPromo />
      </div>
    </>
  );
}
