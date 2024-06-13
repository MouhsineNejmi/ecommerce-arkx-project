"use client";

import SettingsForm from "@/components/office/settings-form";

import { useUserCurrentStore } from "@/hooks/use-user-stores";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = ({ params }: SettingsPageProps) => {
  const { storeId } = params;
  const { store, loading } = useUserCurrentStore({ storeId });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!store && !loading) {
    // redirect("/");
  }

  return <SettingsForm initialData={store} />;
};

export default SettingsPage;
