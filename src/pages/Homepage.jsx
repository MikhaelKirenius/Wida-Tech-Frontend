import React,{Suspense, useEffect} from 'react';
import RevenueChart from '../components/RevenueChart';
import {fetchInvoices, setPage, setLimit} from '../state/invoicesSlice';
import { useDispatch, useSelector } from 'react-redux';
import StatContainer from '../components/container/StatContainer';
import { fetchSummary } from '../state/summarySlice';
import { formatCurrency } from '../utils/formatCurrency';
const InvoiceTable = React.lazy(() => import("../components/invoiceTable"));

function Homepage() {
  const dispatch = useDispatch();
  const { items, status, error, page, limit, total } = useSelector(
    (state) => state.invoices
  );

  const { 
    total_invoices, 
    total_invoices_today, 
    total_amount_paid, 
    total_amount_paid_today, 
  } = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(fetchInvoices({ page, limit }));
    dispatch(fetchSummary());
  }, [page, limit, dispatch]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleLimitChange = (event) => {
    dispatch(setLimit(Number(event.target.value)));
  };

    return (
        <div>
            <div className='flex flex-row justify-around  m-4'>
              <div className='grid grid-cols-2 gap-4'>
                <StatContainer textTitle='Total Invoice' textStat={total_invoices}/>
                <StatContainer textTitle='Invoice Today' textStat={total_invoices_today}/>
                <StatContainer textTitle='Total Amount Paid' textStat={formatCurrency(total_amount_paid)}/>
                <StatContainer textTitle='Amount Paid Today' textStat={formatCurrency(total_amount_paid_today)}/>
              </div>
              <RevenueChart />
            </div>
             <Suspense fallback={<div>Loading...</div>}>
                <InvoiceTable 
                items={items}
                status={status}
                error={error}
                page={page}
                limit={limit}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                onLimitChange={handleLimitChange}
                />
             </Suspense>
        </div>
    );
}

export default Homepage;