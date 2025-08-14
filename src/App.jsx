import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import Routing from "./routes/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routing />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

{
  /*
  <Routes>
            <Route path="/" element={<NewNavbar />}>
              <Route path="users" element={<Users />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/create" element={<TaskCreation />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
  </Routes> 
         
*/
}
