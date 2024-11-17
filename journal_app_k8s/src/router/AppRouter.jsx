// import { Navigate, Route, Routes } from 'react-router-dom'
// import { AuthRoutes } from '../auth/routes/AuthRoutes'
// import { useCheckAuth } from '../hooks'
// import { JournalRoutes } from '../journal/routes/JournalRoutes'
// import { UserRoutes } from '../user/routes/UserRoutes'
// import { CheckingAuth } from '../ui/'

// export const AppRouter = () => {

//     const { status } = useCheckAuth();

//     if (status === 'checking') {
//         return <CheckingAuth />
//     }
//     return (
//         <Routes>
//             {
//                 status === 'authenticated'
//                     ? <Route path='/*' element={<JournalRoutes />} />
//                     : <Route path='/auth/*' element={<AuthRoutes />} />
//             }

//             <Route path='/*' element={<Navigate to='/auth/login' />} />

//             {/*  <Route path='/auth/*' element={<AuthRoutes />} />

//             <Route path='/*' element={<JournalRoutes />} /> */}
//         </Routes>
//     )
// }


// import { Navigate, Route, Routes } from 'react-router-dom'
// import { AuthRoutes } from '../auth/routes/AuthRoutes'
// import { useCheckAuth } from '../hooks'
// import { JournalRoutes } from '../journal/routes/JournalRoutes'
// import { UserRoutes } from '../user/routes/UserRoutes'
// import { CheckingAuth } from '../ui/'

// export const AppRouter = () => {

//     const { status } = useCheckAuth();

//     if (status === 'checking') {
//         return <CheckingAuth />
//     }

//     return (
//         <Routes>

//             {
//                 status === 'authenticated'
//                     // ? <Route path='/*' element={<JournalRoutes />} />
//                     ? <Route path='/*' element={<UserRoutes />} />
//                     : <Route path='/auth/*' element={<AuthRoutes />} />
//             }

//             <Route path='/*' element={<Navigate to='/auth/login' />} />

//             {/*  <Route path='/auth/*' element={<AuthRoutes />} />

//             <Route path='/*' element={<JournalRoutes />} /> */}

//         </Routes>
//     )
// }
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks';
import UserProfilePage from '../user/pages/UserProfilePage';
import { CheckingAuth } from '../ui/';

export const AppRouter = () => {
    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <Route path="/*" element={<UserProfilePage />} />
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
