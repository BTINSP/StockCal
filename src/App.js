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
                background: '#F5F5F5'
            }}
                    theme={'light'}
            ></Header>
            <Layout>
                <Sider
                    width={'5%'}
                    style={{
                        background: '#F5F5F5'
                    }}
                ></Sider>


                <Content style={{
                    minWidth: '100vh',
                    minHeight: '100vh'
                }}>
                    <Cal></Cal>
                </Content>


                <Sider
                    width={'5%'}
                    style={{
                        background: '#F5F5F5'
                    }}
                ></Sider>
            </Layout>
        </Layout>

    </div>
  );
}

export default App;
