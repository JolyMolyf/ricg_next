export interface ITargetItem {
    id?:number;
    icon: string;
    description: string;
}

export const targtes: Array<ITargetItem> = [
    {
        icon: '/images/targetIcons/rocket.png',
        description: 'Wystartuj z nami w stronę rynku pracy'
    },
    {
        icon: '/images/targetIcons/file.png',
        description: 'Stwórz z nami swoje najlepsze dokumenty aplikacyjne'
    }, 
    {
        icon: '/images/targetIcons/search.png',
        description: 'Dowiedz się jak radzić sobie w procesie poszukiwania idealnej pracy'
    },
    {
        icon: '/images/targetIcons/chart.png',
        description: 'Spójrz na siebie z innej strony. Odkryj swój potencjał'
    },
    {
        icon: '/images/targetIcons/group.png',
        description: 'Bądź najlepszą wersją siebie na rozmowie o pracę'
    },
    {
        icon: '/images/targetIcons/phone.png',
        description: 'Zadbaj o swój „PR i marketing'
    }

]