import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";
import useTrackLocation from "../hooks/use-track-location";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext, ACTION_TYPES } from "../store/store-context";

export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {
            coffeeStores,
        },
    };
}

export default function Home(props) {
    const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);
    const { dispatch, state } = useContext(StoreContext);
    const { coffeeStores, latLong } = state;
    console.log("state", state);
    const setCoffeeStores = (coffeeStores) => {
        dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
                coffeeStores,
            },
        });
    };
    useEffect(() => {
        if (latLong) {
            try {
                const fetchNEW = async () => {
                    console.log("start");
                    // const response = await fetch(
                    //     `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
                    // );
                    const coffeeStores = await fetchCoffeeStores(latLong);
                    console.log("useEF", coffeeStores);
                    // const coffeeStores = await response.json();
                    setCoffeeStores(coffeeStores);

                    setCoffeeStoresError("");
                    //set coffee stores
                };
                fetchNEW();
            } catch (error) {
                //set error
                setCoffeeStoresError(error.message);
            }
        }
    }, [latLong]);

    const handleOnBannerBtnClick = () => {
        handleTrackLocation();
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico" />

                <meta name="description" content="allows you to discover coffee stores"></meta>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}></h1>
                <Banner
                    buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
                    handleOnClick={handleOnBannerBtnClick}
                />
                {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
                {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" width={700} height={400} alt="hero image" />
                </div>

                {props.coffeeStores.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Moscow coffee shops</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {coffeeStores.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Coffee shops near me</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
