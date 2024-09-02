/* TODO: This is a list of views in our testing (Pagila) database 
 that were skipping because they contain column names with spaces
 (e.g "zip code"), a feature that we don't currrently support.
 Once we add the support, we should remove this list and the check
 its being used for */

export const tablesToSkip = [
    'actor_info',
    'customer_list',
    'film_list',
    'nicer_but_slower_film_list',
    'sales_by_film_category',
    'sales_by_store',
    'staff_list',
];
