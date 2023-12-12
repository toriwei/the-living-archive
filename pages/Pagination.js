export default function Pagination({
  currentPage,
  handlePageChange,
  numberPages,
  isCurrentPage,
}) {
  return (
    <div className='mt-4'>
      <span
        className='text-3xl cursor-pointer'
        onClick={() =>
          currentPage > 1 ? handlePageChange(currentPage - 1) : ''
        }
      >
        &#8249;
      </span>
      {Array.from({
        length: numberPages,
      }).map((_, index) => (
        <button
          className={`px-3 py-1 mx-1 border ${
            isCurrentPage(index + 1) ? 'border-solid' : 'border-transparent'
          }`}
          key={index}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <span
        className='text-3xl cursor-pointer'
        onClick={() =>
          currentPage < numberPages ? handlePageChange(currentPage + 1) : ''
        }
      >
        &#8250;
      </span>
    </div>
  )
}
