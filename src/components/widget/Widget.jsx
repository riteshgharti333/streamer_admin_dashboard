import "./widget.scss";
import { widgetData } from "../../datatablesource";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Widget = ({ type, totalNo, isLoading }) => {
  const data = widgetData.find((item) => item.type === type);

  return (
    <div className="widget">
      <div className="left">
        {isLoading ? (
          <>
            <Skeleton height={20} width={100} />
            <Skeleton height={30} width={50} />
            <Skeleton height={15} width={150} />
          </>
        ) : (
          <>
            <span className="title">{data?.title}</span>
            <span className="counter">{totalNo}</span>
            <span className="link">
              <Link to={`/${type}`}>{data?.link}</Link>
            </span>
          </>
        )}
      </div>
      {isLoading ? (
        <Skeleton height={20} width={20} />
      ) : (
        <div className="right">{data?.icon}</div>
      )}
    </div>
  );
};

export default Widget;
