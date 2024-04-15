import {useRouter} from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites,getHistory } from "@/lib/userData";
import { useAtom } from "jotai";

const PUBLIC_PATHS = ["/login", "/register", "/", "/_error"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    updateAtoms()
    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {

    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}