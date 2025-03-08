import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
    const [dataWilayah, setDataWilayah] = useState([]);
    const [dataKota, setDataKota] = useState([]);
    const [dataKecamatan, setDataKecamatan] = useState([]);
    const [dataKelurahan, setDataKelurahan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.goapi.io/regional/provinsi?api_key=${apiKey}`;
    const apiUrlKota = `https://api.goapi.io/regional/kota?provinsi_id=`;
    const apiUrlKecamatan = `https://api.goapi.io/regional/kecamatan?kota_id=`;
    const apiUrlKelurahan = `https://api.goapi.io/regional/kelurahan?kecamatan_id=`;
    const [selectedWilayah, setSelectedWilayah] = useState('');
    const [selectedKota, setSelectedKota] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [loadingKota, setLoadingKota] = useState(false);
    const [loadingKecamatan, setLoadingKecamatan] = useState(false);
    const [loadingKelurahan, setLoadingKelurahan] = useState(false);

    useEffect(() => {
        fetchDataWilayah();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchDataWilayah = async () => {
        try {
            const response = await axios.get(apiUrl);
            setDataWilayah(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleWilayahChange = (event) => {
        setSelectedWilayah(event.target.value);
        fetchDataKota(event.target.value);
    };
    const handleKotaChange = (event) => {
        setSelectedKota(event.target.value);
        fetchDataKecamatan(event.target.value);
    };
    const handleKecamatanChange = (event) => {
        setSelectedKecamatan(event.target.value);
        fetchDataKelurahan(event.target.value);
    };

    const fetchDataKecamatan = async (kotaId) => {
        setLoadingKecamatan(true);
        try {
            const response = await axios.get(`${apiUrlKecamatan}${kotaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                },
            });
            setDataKecamatan(response.data.data);
            setLoadingKecamatan(false);
        } catch (err) {
            setError(err);
            setLoadingKecamatan(false);
        }
    };

    const fetchDataKelurahan = async (kecamatanId) => {
        setLoadingKelurahan(true);
        try {
            const response = await axios.get(`${apiUrlKelurahan}${kecamatanId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                },
            });
            setDataKelurahan(response.data.data);
            setLoadingKelurahan(false);
        } catch (err) {
            setError(err);
            setLoadingKelurahan(false);
        }
    };

    const fetchDataKota = async (provinsiId) => {
        setLoadingKota(true);
        try {
            const response = await axios.get(`${apiUrlKota}${provinsiId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                },
            });
            setDataKota(response.data.data);
            setLoadingKota(false);
        } catch (err) {
            setError(err);
            setLoadingKota(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto p-4 bg-blue-200 h-dvh">
            <select className="bg-gray-50 field-sizing-content border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={selectedWilayah}
                onChange={handleWilayahChange}>
                <option value="">Pilih Wilayah</option>
                {dataWilayah.map((wilayah) => (
                    <option key={wilayah.id} value={wilayah.id}>
                        {wilayah.name}
                    </option>
                ))}
            </select>
            {selectedWilayah && (
                <select className="bg-gray-50 field-sizing-content border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={selectedKota}
                onChange={handleKotaChange}>
                    <option value="">Pilih Kota</option>
                    {loadingKota ? (
                        <option>Loading...</option>
                    ) : (
                        dataKota.map((kota) => (
                            <option key={kota.id} value={kota.id}>
                                {kota.name}
                            </option>
                        ))
                    )}
                </select>
            )}
            {selectedKota && (
                <select className="bg-gray-50 field-sizing-content border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={selectedKecamatan}
                onChange={handleKecamatanChange}>
                    <option value="">Pilih Kecamatan</option>
                    {loadingKecamatan ? (
                        <option>Loading...</option>
                    ) : (
                        dataKecamatan.map((kecamatan) => (
                            <option key={kecamatan.id} value={kecamatan.id}>
                                {kecamatan.name}
                            </option>
                        ))
                    )}
                </select>
            )}
            {selectedKecamatan && (
                <select className="bg-gray-50 field-sizing-content border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option value="">Pilih Kelurahan</option>
                    {loadingKelurahan ? (
                        <option>Loading...</option>
                    ) : (
                        dataKelurahan.map((kelurahan) => (
                            <option key={kelurahan.id} value={kelurahan.id}>
                                {kelurahan.name}
                            </option>
                        ))
                    )}
                </select>
            )}
        </div>
    );
}