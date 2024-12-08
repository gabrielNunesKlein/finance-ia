import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_conlumns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentTransactions } from "../_data/get-current-month-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

export default async function Transactions() {
  const { userId } = await auth()
  
  if(!userId){
    redirect("login")
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId ?? ""
    }
  });

  const userCanTransaction = await canUserAddTransaction()

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanTransaction} />
        </div>
        <DataTable data={transactions} columns={transactionsColumns} />
      </div>
    </>
  );
}
