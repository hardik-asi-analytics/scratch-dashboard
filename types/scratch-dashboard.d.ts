import React from "react";

// Declartion file for types and exports from npm-package
declare module "scratch-dashboard" {
  interface PageProps {
    idOrSlug: string;
  }

  export const DashboardPage: React.FC<PageProps>;  
}
