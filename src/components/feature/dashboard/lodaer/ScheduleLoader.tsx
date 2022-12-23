import ContentLoader from "react-content-loader";
import ContentLayout from "../../../layouts/ContentLayout";

export const SkeletonLoader = () => (
  <ContentLayout
    title="Dashboard"
    subTitle="Create events to share for people to book on your calendar."
  >
    <ContentLoader
      uniqueKey="skeleton_loader"
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  </ContentLayout>
);
