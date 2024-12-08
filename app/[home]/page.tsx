import Image from "next/image";
import { Button } from "../_components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dark } from "@clerk/themes";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import MonthSelect from "./_components/month-select";
import TransactionsChart from "./_components/transactions-chart";
import { getDashboard } from "../_data/get-dashboard";
import { isMatch } from "date-fns";
import ExpensePerCategory from "./_components/expense-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AIReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: { month: string }
}

export default async function Home( {searchParams: { month }}: HomeProps) {

  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/Home/?month=${new Date().getMonth() + 1}`);
  }
  const user = await clerkClient().users.getUser(userId)
  const dashboard = await getDashboard(month);
  const userCanTransaction = await canUserAddTransaction()

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 overflow-hidden flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl fint-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AIReportButton 
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <MonthSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month || `${new Date().getMonth() + 1}`} {...dashboard} userCanAddTransaction={userCanTransaction} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsChart {...dashboard} />
              <ExpensePerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
      </div>
    </>
  );
}
