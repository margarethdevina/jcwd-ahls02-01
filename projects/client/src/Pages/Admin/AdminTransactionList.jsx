import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useToastHook } from "../../Components/CustomToast";
import AdminTransCardValidasiResepComponent from "../../Components/Admin/AdminTransCardValidasiResep";
import AdminTransCardMenungguPembayaranComponent from "../../Components/Admin/AdminTransCardMenungguPembayaran";
import AdminTransCardMenungguKonfirmasiComponent from "../../Components/Admin/AdminTransCardMenungguKonfirmasi";
import AdminTransCardDiprosesComponent from "../../Components/Admin/AdminTransCardDiproses";
import AdminTransCardDikirimComponent from "../../Components/Admin/AdminTransCardDikirim";
import AdminTransCardPesananDikonfirmasiComponent from "../../Components/Admin/AdminTransCardPesananDikonfirmasi";
import AdminTransCardDibatalkanComponent from "../../Components/Admin/AdminTransCardDibatalkan";
import Sidebar from "../../Components/Admin/Sidebar";
import { getTransactionAdminAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Divider,
    Text,
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";

const AdminTransactionListPage = (props) => {

    //* assign function
    const [currentToast, newToast] = useToastHook();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //^ STATE MANAGEMENT
    const [orderData, setOrderData] = useState("null");
    const [filterInvoice, setFilterInvoice] = useState("");
    const [filterDateBegin, setFilterDateBegin] = useState("");
    const [filterDateEnd, setFilterDateEnd] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    const [queryFilterSort, setQueryFilterSort] = useState("");

    //& component did mount
    useEffect(() => {
        { props.defaultTabIndex && setTabIndex(props.defaultTabIndex) }
        dispatch(getTransactionAdminAction());
    }, [])

    //TODO nanti ambil dr reducer transaksi
    const { transactionList } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.transactionAdminView
        }
    })

    //& untuk ambil BE transaksi yang terpaginate dan tersortir
    const handleSortDropdown = (sortValue) => {
        // console.log(`dropdown yang terpilih ${sortValue}`);

        if (sortValue != "null") {
            setOrderData(sortValue);
        }
    }

    const btnFilterSort = () => {

        // console.log(`===ISI BTN FILTER SORT====`)
        //^check isi handle filter dan sort
        // console.log(`isi filterDateBegin ${filterDateBegin}`);
        // console.log(`isi filterDateEnd ${filterDateEnd}`);
        // console.log(`isi filterInvoice ${filterInvoice}`);
        let _sortBy = orderData.split('-')[0];
        if (_sortBy == "invoiceNumber") {
            _sortBy = "t1.invoiceNumber"
        } else {
            _sortBy = "t1.addDate"
        }
        // console.log(`isi _sortBy ${_sortBy}`);

        let _order = orderData.split('-')[1];
        // console.log(`isi _order ${_order}`);

        let query = '?';
        if (_sortBy && _order) {
            if (filterInvoice) {
                if (filterDateBegin && filterDateEnd) {
                    // ^ ===FILTER CONDITION 1 SORT, INV, DATE===
                    // console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`);

                    query += `_filterInvoice=${filterInvoice}&_dateGte=${filterDateBegin}&_dateLte=${filterDateEnd}&_sortBy=${_sortBy}&_order=${_order}`;

                } else {
                    // ^ ===FILTER CONDITION 2 SORT, INV===
                    // console.log(`===FILTER CONDITION 2 SORT, INV===`);

                    query += `_filterInvoice=${filterInvoice}&_sortBy=${_sortBy}&_order=${_order}`;

                }
            } else if (filterDateBegin && filterDateEnd) {
                // ^ ===FILTER CONDITION 3 SORT, DATE===
                // console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                query += `_dateGte=${filterDateBegin}&_dateLte=${filterDateEnd}&_sortBy=${_sortBy}&_order=${_order}`;

            } else {
                // ^ ===FILTER CONDITION 4 SORT===
                // console.log(`===FILTER SORT CONDITION 4 SORT===`);

                query += `_sortBy=${_sortBy}&_order=${_order}`;

            }
        } else {
            if (filterDateBegin && filterDateEnd && filterInvoice) {
                // ^ ===FILTER CONDITION 5 DATE INV ===
                // console.log(`===FILTER CONDITION 5 DATE INV ===`);

                query += `_filterInvoice=${filterInvoice}&_dateGte=${filterDateBegin}&_dateLte=${filterDateEnd}`;

            } else if (filterDateBegin && filterDateEnd) {
                // ^ ===FILTER CONDITION 6 DATE===
                // console.log(`===FILTER CONDITION 6 DATE===`);

                query += `_dateGte=${filterDateBegin}&_dateLte=${filterDateEnd}`;

            } else if (filterInvoice) {
                // ^ ===FILTER CONDITION 7 INV===
                // console.log(`===FILTER CONDITION 7 INV===`);

                query += `_filterInvoice=${filterInvoice}`;

            }
        }

        // console.log(`query jadinya gmn?`, query)
        setQueryFilterSort(query);
        return query;
    }

    const btnReset = () => {
        setFilterDateBegin('');
        setFilterDateEnd('');
        setFilterInvoice('');
        setOrderData('');
        setQueryFilterSort(``);
    }

    return (
        <>
            <div
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-4">
                        <Sidebar />
                        <Text></Text>
                    </div>
                    <div className="col-md-9 col-sm-9 col-8">
                        <div className="row container mt-4">
                            <div
                                className="col-12 col-sm-2 col-md-3 d-none d-xl-block order-md-1 py-3"
                            >
                                <Box
                                    borderRadius={5}
                                    shadow="md"
                                    py={2}
                                    textAlign="left"
                                    className="font-brand"
                                >
                                    <Text
                                        py={2}
                                        ps={4}
                                        className="h6b"
                                    >
                                        Filter dan atau urutkan berdasarkan:
                                    </Text>
                                    <Divider
                                        className="d-none d-md-block"
                                    />
                                    <Box>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Tanggal awal' width={150} />
                                            <Input
                                                type='date'
                                                value={filterDateBegin}
                                                onChange={(e) => setFilterDateBegin(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Tanggal akhir' width={150} />
                                            <Input
                                                type='date'
                                                value={filterDateEnd}
                                                onChange={(e) => setFilterDateEnd(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Nomor invoice' width={150} />
                                            <Input
                                                type='text'
                                                placeholder="Cari transaksimu disini" value={filterInvoice}
                                                onChange={(e) => setFilterInvoice(e.target.value)}
                                            />
                                        </InputGroup>
                                        <Select
                                            size="sm"
                                            alignItems="left"
                                            className="font-brand"
                                            variant="filled"
                                            value={orderData}
                                            onChange={(e) => handleSortDropdown(e.target.value)}
                                        >
                                            <option
                                                value="null"
                                            >
                                                Urutkan berdasarkan ...
                                            </option>
                                            <option
                                                value="invoiceNumber-asc"
                                            >
                                                Nomor Invoice - Ascending
                                            </option>
                                            <option
                                                value="invoiceNumber-desc"
                                            >
                                                Nomor Invoice - Descending
                                            </option>
                                            <option
                                                value="addDate-asc"
                                            >
                                                Tanggal Invoice - Ascending
                                            </option>
                                            <option
                                                value="addDate-desc"
                                            >
                                                Tanggal Invoice - Descending
                                            </option>
                                        </Select>
                                        <Button
                                            mx={{ base: 2, md: 0 }}
                                            mt={{ base: 2, md: 2 }}
                                            width={{ base: "100%", md: "100%"}}
                                            className="btn-def"
                                            onClick={btnFilterSort}
                                            >
                                            Terapkan
                                        </Button>
                                        <Button
                                            mx={{ base: 2, md: 0 }}
                                            mt={{ base: 2, md: 2 }}
                                            width={{ base: "100%", md: "100%"}}
                                            className="btn-def"
                                            onClick={btnReset}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                            <div
                                className="col-12 col-sm-9 col-md-9 order-1 order-md-2"
                            >
                                <Text
                                    className="h3"
                                    pt={{ base: 2, md: 6 }}
                                    pb={{ base: 0, md: 4 }}
                                >
                                    Daftar Transaksi
                                </Text>
                                <Box
                                    shadow='md'
                                    borderRadius={5}
                                >
                                    <Tabs
                                        variant='soft-rounded'
                                        isFitted='true'
                                        className="font-brand"
                                        orientation={{ base: 'vertical', md: 'horizontal' }}
                                        defaultIndex={tabIndex}
                                        onChange={(e) => setTabIndex(e)}
                                    >
                                        <TabList
                                            overflowX={{ base: "scroll", sm: "scroll", md: "scroll", xl: "hidden" }}
                                            maxWidth="100vw"
                                        >
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Validasi Resep
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Menunggu Pembayaran
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Menunggu Konfirmasi
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Diproses
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Dikirim
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Pesanan Dikonfirmasi
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Dibatalkan
                                            </Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <AdminTransCardValidasiResepComponent
                                                    dbValidasiResep={transactionList.filter(val => val.transactionStatus == "Menunggu Diproses Penjual")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardMenungguPembayaranComponent
                                                    dbMenungguPembayaran={transactionList.filter(val => val.transactionStatus == "Menunggu Pembayaran")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardMenungguKonfirmasiComponent
                                                    dbMenungguKonfirmasi={transactionList.filter(val => val.transactionStatus == "Menunggu Konfirmasi")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDiprosesComponent
                                                    dbDiproses={transactionList.filter(val => val.transactionStatus == "Diproses")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDikirimComponent
                                                    dbDikirim={transactionList.filter(val => val.transactionStatus == "Dikirim")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardPesananDikonfirmasiComponent
                                                    dbPesananDikonfirmasi={transactionList.filter(val => val.transactionStatus == "Pesanan Dikonfirmasi")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDibatalkanComponent
                                                    dbDibatalkan={transactionList.filter(val => val.transactionStatus == "Dibatalkan")}
                                                    query={queryFilterSort}

                                                />
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTransactionListPage;