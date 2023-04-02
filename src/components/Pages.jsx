import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

export const Pages = observer(() => {
    const {innogotchi} = useContext(Context)
    const pageCount = Math.ceil(innogotchi.totalCount/ innogotchi.size)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={innogotchi.page === page}
                    onClick={() => innogotchi.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});