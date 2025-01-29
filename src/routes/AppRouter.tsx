import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "./types";
import { lazy, Suspense } from "react";
import LoaderComponent from "@/components/loader/LoaderComponent";
import { LoaderWrapper } from "./styled";

const AuthPage = lazy(() => import('@/pages/auth_page/AuthPage'));
const MainPage = lazy(() => import('@/pages/main_page/MainPage'));

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: AppRoutes.Main,
            element: <Suspense
                fallback={<LoaderWrapper>
                    <LoaderComponent />
                </LoaderWrapper>}>
                <MainPage />
            </Suspense>
        },
        {
            path: AppRoutes.Auth,
            element: <Suspense fallback={<LoaderWrapper>
                <LoaderComponent />
            </LoaderWrapper>}>
                <AuthPage />
            </Suspense>
        },
        {
            path: AppRoutes.All,
            element: <Suspense fallback={<LoaderWrapper>
                <LoaderComponent />
            </LoaderWrapper>}>
                <MainPage />
            </Suspense>
        },
    ]);

    return <RouterProvider router={router} />
}

export default AppRouter;