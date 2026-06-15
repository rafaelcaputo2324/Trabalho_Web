export default function ReusableTable({ headers, data, keys, onEdit, onDelete }) {
  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0 bg-white">
        <thead className="bg-light text-secondary">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} scope="col">
                {header}
              </th>
            ))}
            {(onEdit || onDelete) && <th scope="col">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length + ((onEdit || onDelete) ? 1 : 0)} className="text-center py-4 text-muted">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {keys.map((key, idx) => (
                  <td key={idx}>{item[key]}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="d-flex gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="btn btn-sm btn-outline-warning mr-2"
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
