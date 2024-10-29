import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PersonIcon from "@mui/icons-material/Person";

import { format } from "date-fns";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 100 },

  {
    field: "name",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.profilePic ? (
            <img className="cellImg" src={params.row.profilePic} alt="avatar" />
          ) : (
            <PersonIcon style={{ fontSize: 30 }} />
          )}
          {params.row.name}
        </div>
      );
    },
  },

  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "isAdmin",
    headerName: "Admin",
    width: 200,
  },

  // {
  //   field: "createdAt",
  //   headerName: "",
  //   width: 100,
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const movieColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },

  {
    field: "year",
    headerName: "Year",
    width: 200,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const MovieListColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "type",
    headerName: "Type",
    width: 200,
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const ListofListColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "isSeries",
    headerName: "Web Series",
    width: 230,
  },

  // {
  //   field: "year",
  //   headerName: "Year",
  //   width: 200,
  // },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
];

export const ListofListSColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "isSeries",
    headerName: "Web Series",
    width: 150,
  },

  // {
  //   field: "year",
  //   headerName: "Year",
  //   width: 200,
  // },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
];

export const SubscriptionsColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "plan",
    headerName: "Plan",
    width: 230,
  },

  {
    field: "name",
    headerName: "Customer Name",
    width: 130,
  },

  {
    field: "price",
    headerName: "Price",
    width: 80,
  },

  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    renderCell: (params) => {
      // Format the date using date-fns
      return format(new Date(params.value), "MM/dd/yyyy");
    },
  },
  {
    field: "endDate",
    headerName: "Expire Date",
    width: 130,
    renderCell: (params) => {
      // Format the date using date-fns
      return format(new Date(params.value), "MM/dd/yyyy");
    },
  },
];

export const TransactionsColumns = [
  { field: "_id", headerName: "ID", width: 100 },

  {
    field: "plan",
    headerName: "Plan",
    width: 230,
  },

  {
    field: "name",
    headerName: "Customer Name",
    width: 150,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
  },

  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    renderCell: (params) => {
      // Format the date using date-fns
      return format(new Date(params.value), "MM/dd/yyyy");
    },
  },
  {
    field: "endDate",
    headerName: "Expire Date",
    width: 150,
    renderCell: (params) => {
      // Format the date using date-fns
      return format(new Date(params.value), "MM/dd/yyyy");
    },
  },
];

export const widgetData = [
  {
    type: "users",
    title: "USERS",
    link: "View all users",
    query: "users",
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
  },
  {
    type: "movies",
    title: "MOVIES",
    link: "View all Movies",
    query: "movies",
    icon: (
      <LocalMoviesIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  },
  {
    type: "series",
    title: "SERIES",
    link: "View all web series",
    query: "series",
    icon: (
      <OndemandVideoIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
  },
  {
    type: "subscriptions",
    title: "TOTAL SUBSCRIPTIONS",
    link: "See all subscriptions",
    query: "subscriptions",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
        }}
      />
    ),
  },
];

export const genre = [
  "Action",
  "Adventure",
  "Anime",
  "Animation",
  "TV Dramas",
  "Documentaries",
  "Horror",
  "Romantic",
  "Sci-fi",
  "Fantasy",
  "Sports",
  "Thrillers",
];

export const ageRestrictions = ["All", "12", "15", "18"];
