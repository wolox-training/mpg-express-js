const DEFAULT_PAGE = 1,
  DEFAULT_PAGESIZE = 10;

exports.pagination = (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGESIZE) => ({
  page,
  pageSize,
  offset: pageSize * (page - 1)
});
