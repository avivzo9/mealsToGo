import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { fontSizes, spacing } from '../../../utils/sizes';
import RestaurantsCard from '../cmps/RestaurantsCard.cmp';
import Search from '../cmps/Search.cmp';
import FadeInView from '../../animations/fade.animation';
import { LocationContext } from '../../../services/location/location.context';
import { colors } from '../../../utils/colors';
import { AppConfigContext } from '../../../services/appConfig/appConfig.context';
import Loader from '../../Loader';

export default function RestaurantsScreen({ navigation }) {
    const { restaurants, restaurantLoading, restaurantError } = useContext(RestaurantsContext)
    const { locationError, isLocationLoading } = useContext(LocationContext)
    const { isDarkMode } = useContext(AppConfigContext)

    const isErrors = (!!restaurantError || !!locationError);

    if (restaurantLoading || isLocationLoading) return (<Loader />)

    return (
        <SafeAreaView style={styles(isDarkMode).container}>
            <Search />
            {isErrors && <View style={styles().errCon}>
                <Text style={styles().errorMsg}>Something went wrong retrieving the data.</Text>
                <Text style={styles().errorMsg}>Try different search or try again later.</Text>
            </View>}
            {!isErrors && <FlatList data={restaurants}
                renderItem={({ item, idx }) => <FadeInView duration={500}>
                    <RestaurantsCard navigation={navigation} restaurant={item} key={`${item.name}-${idx}`} />
                </FadeInView>}
                contentContainerStyle={{ padding: spacing.md }} />}
        </SafeAreaView>
    )
};

const styles = (isDark) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light,
    },
    errCon: {
        marginTop: spacing.lg
    },
    errorMsg: {
        color: 'red',
        textAlign: 'center',
        fontSize: fontSizes.md,
        padding: spacing.sm
    }
});