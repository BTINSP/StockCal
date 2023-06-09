import { InputNumber,Card, Table,Button, Row, Col } from 'antd';
import {PieChartTwoTone, MoneyCollectTwoTone, HourglassTwoTone, FundTwoTone} from "@ant-design/icons"
import './index.css'

import {useState} from "react";




function Cal(){
    const tableChildren = [
        {
            title: '第一年',
            dataIndex: 'y1',
            key: 'y1',
        },
        {
            title: '第二年',
            dataIndex: 'y2',
            key: 'y2',
        },
        {
            title: '第三年',
            dataIndex: 'y3',
            key: 'y3',
        },
        {
            title: '第四年',
            dataIndex: 'y4',
            key: 'y4',
        },
        {
            title: '第五年',
            dataIndex: 'y5',
            key: 'y5',
        },
        {
            title: '第六年',
            dataIndex: 'y6',
            key: 'y6',
        },
        {
            title: '第七年',
            dataIndex: 'y7',
            key: 'y7',
        },
        {
            title: '第八年',
            dataIndex: 'y8',
            key: 'y8',
        },
        {
            title: '第九年',
            dataIndex: 'y9',
            key: 'y9',
        },
        {
            title: '第十年',
            dataIndex: 'y10',
            key: 'y10',
        },
        {
            title: '十年平均年收益率',
            dataIndex: 'y10_ave_roe',
            key: 'y10_ave_roe',
        },
    ]

    const columns = [
        {
            title: '现价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '当前净资产',
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: 'ROE',
            dataIndex: 'roe',
            key: 'roe',
        },
        {
            title: '最低收益率价格',
            children: tableChildren
        },
        {
            title: '修改',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, record) =>{
                return(
                    <div>
                        <Button
                            type="primary" danger
                            onClick={()=>{
                            handleDelete(record.key)
                        }}>删除</Button>
                    </div>
                )
            }


        }
    ];

    const subColumns = [
        {
            title: '每股净资产',
            children: [
                {
                    title: '第一年',
                    dataIndex: 'y1_asset',
                    key: 'y1_asset',
                },
                {
                    title: '第二年',
                    dataIndex: 'y2_asset',
                    key: 'y2_asset',
                },
                {
                    title: '第三年',
                    dataIndex: 'y3_asset',
                    key: 'y3_asset',
                },
                {
                    title: '第四年',
                    dataIndex: 'y4_asset',
                    key: 'y4_asset',
                },
                {
                    title: '第五年',
                    dataIndex: 'y5_asset',
                    key: 'y5_asset',
                },
                {
                    title: '第六年',
                    dataIndex: 'y6_asset',
                    key: 'y6_asset',
                },
                {
                    title: '第七年',
                    dataIndex: 'y7_asset',
                    key: 'y7_asset',
                },
                {
                    title: '第八年',
                    dataIndex: 'y8_asset',
                    key: 'y8_asset',
                },
                {
                    title: '第九年',
                    dataIndex: 'y9_asset',
                    key: 'y9_asset',
                },
                {
                    title: '第十年',
                    dataIndex: 'y10_asset',
                    key: 'y10_asset',
                },
                {
                    title: '十年平均年收益率',
                    dataIndex: 'y10_ave_roe_asset',
                    key: 'y10_ave_roe_asset',
                },
            ]
        }
    ];

    // eslint-disable-next-line
    const [priceValue, setPriceValue] = useState()
    const [roeValue, setRoeValue] = useState()
    const [assetValue, setAssetValue] = useState()
    const [lowReturnValue, setLowReturnValue] = useState(5)
    const [tableData,setTableData] = useState([])


    const [targetReturn, setReturn] = useState()
    const [targetAsset, setTargetAsset] = useState()
    const [targetPrice, setTargetPrice] = useState()

    function getAssetListOfYear(assetValue,roeValue){
        let data = []
        let assetTemp = Number(assetValue)+ (Number(assetValue) * Number(roeValue))
        data.push(assetTemp.toFixed(2))
        for (let i = 0; i < 10 - 1; i++) {
            assetTemp = assetTemp + (assetTemp * roeValue)
            data.push(assetTemp.toFixed(2))
        }
        return data
    }

    function getLowReturnPriceListOfYear(assetListOfYear, roeValue, lowReturnValue){
        let data = []
        assetListOfYear.forEach((item)=> {
           let rPrice = Number(item) * Number(roeValue) / Number(lowReturnValue)
           data.push(rPrice.toFixed(2))
        })
        return data
    }

    function getAveRoe(lowReturnPriceListOfYear, basePrice){
        let lastPrice = lowReturnPriceListOfYear[lowReturnPriceListOfYear.length - 1];
        let roe = ((lastPrice / basePrice) ** (1 / lowReturnPriceListOfYear.length)) -1
        return (roe * 100).toFixed(2)
    }

    function handleDelete(key) {
        let data = []
        tableData.forEach((item)=> {
            if (item.key !== key){
                data.push(item)
            }
        })
        setTableData(data)
    }

    function getTargetPrice(){

    }

    function addTableData() {
        let data = []

        let roe = roeValue / 100
        let lowReturn = lowReturnValue / 100

        let assetListOfYear = getAssetListOfYear(assetValue, roe)
        let lowReturnPriceListOfYear = getLowReturnPriceListOfYear(assetListOfYear, roe, lowReturn);
        let aveRoe = getAveRoe(lowReturnPriceListOfYear, priceValue);
        let aveRoe_asset = getAveRoe(assetListOfYear, priceValue);
        let temp = {
            key: tableData.length + 1,
            name: 'name',
            price: priceValue,
            asset: assetValue,
            roe: roeValue + "%",
            y1: lowReturnPriceListOfYear[0],
            y1_asset: assetListOfYear[0],
            y2: lowReturnPriceListOfYear[1],
            y2_asset: assetListOfYear[1],
            y3: lowReturnPriceListOfYear[2],
            y3_asset: assetListOfYear[2],
            y4: lowReturnPriceListOfYear[3],
            y4_asset: assetListOfYear[3],
            y5: lowReturnPriceListOfYear[4],
            y5_asset: assetListOfYear[4],
            y6: lowReturnPriceListOfYear[5],
            y6_asset: assetListOfYear[5],
            y7: lowReturnPriceListOfYear[6],
            y7_asset: assetListOfYear[6],
            y8: lowReturnPriceListOfYear[7],
            y8_asset: assetListOfYear[7],
            y9: lowReturnPriceListOfYear[8],
            y9_asset: assetListOfYear[8],
            y10: lowReturnPriceListOfYear[9],
            y10_asset: assetListOfYear[9],
            y10_ave_roe: aveRoe + "%",
            y10_ave_roe_asset: aveRoe_asset + "%",
        }
        tableData.forEach((item)=> {
            data.push(item)
        })
        data.push(temp)
        setTableData(data)
    }

    return(
        <div>
            <Card>
                <Row gutter={8}>
                    <Col span={4}>
                        <Card title="收益率计算">
                            <InputNumber
                                className = 'inputNormal'
                                prefix={<MoneyCollectTwoTone />}
                                addonAfter = {"¥"}
                                value = {priceValue}
                                onChange = {(value)=>{
                                    setPriceValue(value)
                                }}
                                placeholder="现价"
                                min={1} max={10000}
                            >
                            </InputNumber>
                            <br/>
                            <InputNumber
                                className = 'inputNormal'
                                prefix={<PieChartTwoTone />}
                                addonAfter = {"¥"}
                                value = {assetValue}
                                onChange = {(value)=>{
                                    setAssetValue(value)
                                }}
                                placeholder="净资产"
                                min={1} max={2000}
                            >
                            </InputNumber>
                            <br/>
                            <InputNumber
                                className = 'inputNormal'
                                value = {roeValue}
                                onChange = {(value)=>{
                                    setRoeValue(value)
                                }}
                                placeholder="ROE"
                                prefix={<FundTwoTone />}
                                addonAfter = {"%"}
                                min={1} max={200}
                            >
                            </InputNumber>
                            <br/>
                            <InputNumber
                                className = 'inputNormal'
                                prefix={<HourglassTwoTone />}
                                addonAfter = {"%"}
                                value = {lowReturnValue}
                                onChange = {(value)=>{
                                    setLowReturnValue(value)
                                }}
                                defaultValue = {lowReturnValue}
                                placeholder="目标最低回报率"
                                min={0} max={200}
                            >
                            </InputNumber>
                            <br/>
                            <Button
                                className = 'buttonNormal'
                                type="primary" onClick={addTableData} >
                                添加
                            </Button>

                            <Button
                                className= "buttonNormal"
                                type="primary" danger onClick={()=>{
                                setPriceValue()
                                setAssetValue()
                                setRoeValue()
                                setRoeValue()
                            }}>
                                清空
                            </Button>
                        </Card>
                    </Col>

                    {/*<Col span={4}>*/}
                    {/*    <Card>*/}
                    {/*        <InputNumber*/}
                    {/*            className = 'inputNormal'*/}
                    {/*            prefix={<MoneyCollectTwoTone />}*/}
                    {/*            addonAfter = {"¥"}*/}
                    {/*            value = {targetAsset}*/}
                    {/*            placeholder="每股净资产"*/}
                    {/*            min={1} max={10000}*/}
                    {/*        >*/}
                    {/*        </InputNumber>*/}

                    {/*        <InputNumber*/}
                    {/*            className = 'inputNormal'*/}
                    {/*            prefix={<MoneyCollectTwoTone />}*/}
                    {/*            addonAfter = {"¥"}*/}
                    {/*            value = {targetReturn}*/}
                    {/*            placeholder="目标回报率"*/}
                    {/*            min={1} max={10000}*/}
                    {/*        >*/}
                    {/*        </InputNumber>*/}

                    {/*        <InputNumber*/}
                    {/*            className = 'inputNormal'*/}
                    {/*            prefix={<MoneyCollectTwoTone />}*/}
                    {/*            addonAfter = {"¥"}*/}
                    {/*            value = {targetPrice}*/}
                    {/*            placeholder="目标价格"*/}
                    {/*            min={1} max={10000}*/}
                    {/*        >*/}
                    {/*        </InputNumber>*/}

                    {/*        <Button*/}
                    {/*            className = 'inputNormal'*/}
                    {/*            type="primary" onClick={addTableData} >*/}
                    {/*            添加*/}
                    {/*        </Button>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}


                </Row>
            </Card>


            <Card>
                <Table
                    bordered = {true}
                    pagination={false}
                    columns={columns}
                    dataSource={tableData}
                    expandable = {{
                        expandedRowRender: (record) => {
                            let subTableData = [
                                record
                            ]
                            return(
                                <Table
                                    bordered = {true}
                                    pagination={false}
                                    columns={subColumns}
                                    dataSource={subTableData}
                                />
                            )
                        }
                    }}
                />
            </Card>
        </div>
    )



}


export default Cal