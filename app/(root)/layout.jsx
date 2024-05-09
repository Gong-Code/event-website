import AuthLayout from "../(auth)/layout";


//Lägg navbar, footer osv här
const RootLayout = ({ children }) => {
    
    return (
        <div>
            <AuthLayout>
                {children}
            </AuthLayout>
        </div>
    )
}

export default RootLayout;