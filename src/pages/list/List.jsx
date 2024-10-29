import "./list.scss";
import Datatable from "../../components/datatable/Datatable";

const List = ({ title, type, listColumns, movieType }) => {
  return (
    <div className="list">
      <Datatable
        title={title}
        type={type}
        listColumns={listColumns}
        movieType={movieType}
      />
    </div>
  );
};

export default List;
