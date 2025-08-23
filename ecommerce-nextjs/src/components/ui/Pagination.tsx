import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPageUrl?: string;
  backPageUrl?: string;
  showNextButton?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  nextPageUrl,
  backPageUrl,
  showNextButton = true
}: PaginationProps) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="p-2 bd-highlight">
        {backPageUrl ? (
          <Link href={backPageUrl}>
            <button type="button" className="btn btn-primary">
              <i className="fa-solid fa-circle-chevron-left"></i> Halaman Sebelumnya
            </button>
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            <i className="fa-solid fa-circle-chevron-left"></i> Halaman Sebelumnya
          </button>
        )}
      </div>
      
      <div className="d-flex align-items-center">
        <span className="text-muted me-3">
          Halaman {currentPage} dari {totalPages}
        </span>
      </div>
      
      <div className="ms-auto p-2">
        {nextPageUrl && showNextButton ? (
          <Link href={nextPageUrl}>
            <button type="button" className="btn btn-primary">
              Halaman Selanjutnya <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            Halaman Selanjutnya <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}