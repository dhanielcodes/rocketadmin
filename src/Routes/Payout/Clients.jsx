import React from "react";
import BodyLayout from "../../reuseables/BodyLayout";
import ClientTable from "../../TableComponent/Payout/ClientTable";

export default function ClientsPage() {
  return (
    <>
      <BodyLayout>
        <ClientTable />
      </BodyLayout>
    </>
  );
}
