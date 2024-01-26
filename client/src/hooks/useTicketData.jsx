import { fetchTickets } from "../../services/callsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useTicketData = () => {
  const {currentUser} = useAuth()
  const { status, isError, data, fetchNextPage, hasNextPage,isFetching,isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [currentUser.id],
      queryFn: fetchTickets,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages, lastPageParam) => {
        
        if (pages && lastPage?.hasNextPage) return lastPageParam + 1;
      },
    });
  let tickets = data?.pages[0]?.tickets ? data?.pages?.flatMap((page) => page.tickets) : []
  return { status, isError, tickets, fetchNextPage, hasNextPage, isFetching,isFetchingNextPage };
};
