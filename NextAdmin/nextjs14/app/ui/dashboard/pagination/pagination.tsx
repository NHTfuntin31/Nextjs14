"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from 'react';

const Pagination = ({ count }:{ count: number }) => {
const searchParams = useSearchParams();
const { replace } = useRouter();
const pathname = usePathname();

const page = parseInt(searchParams.get("page") || "1", 10);

const params = new URLSearchParams(searchParams);
const ITEM_PER_PAGE = 2;

const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

const handleChangePage = (type: "prev" | "next") => {
	const query = new URLSearchParams(searchParams);
	
	type === "prev"
	? query.set("page", String(page - 1))
	: query.set("page", String(page + 1));

	replace(`${pathname}?${query}`);
};

return (
<div className={styles.container}>
	<button
	className={styles.button}
	disabled={!hasPrev}
	onClick={() => handleChangePage("prev")}
	>
	Previous
	</button>
	<button
	className={styles.button}
	disabled={!hasNext}
	onClick={() => handleChangePage("next")}
	>
	Next
	</button>
</div>
);
};

export default Pagination;
