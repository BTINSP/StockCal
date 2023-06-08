import Cal from "./pages/cal";
import './App.css'
import { Layout } from 'antd';
const { Header,Sider, Content } = Layout;


function App() {
  return (
    <div className = "App">
        <Layout>
            <Header style={{
                height: '3vh',
                background: '#ffffff'
            }}
                    theme={'light'}
            ></Header>
            <Layout style={{
                minHeight: '100vh'
            }}>
                <Sider
                    width={'5%'}
                    theme={'light'}
                ></Sider>


                <Content>
                    <Cal></Cal>
                </Content>


                <Sider
                    width={'5%'}
                    theme={'light'}
                ></Sider>
            </Layout>
        </Layout>

    </div>
  );
}

export default App;
