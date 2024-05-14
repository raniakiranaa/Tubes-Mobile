// import { DefaultTheme } from 'styled-components';
// import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/Poppins"
// import { useFonts } from "expo-font";

// async function loadPoppinsFonts() {
//     await useFonts({
//         Poppins_400Regular,
//         Poppins_500Medium,
//         Poppins_600SemiBold,
//         Poppins_700Bold,
//     });
// }

const MyTheme = {
    colors: {
        brown_1: '#5A463B',
        brown_2: '#785846',
        brown_3: '#926E4D',

        pink_1: '#D37F74',
        pink_2: '#F19E93',
        pink_3: '#F8BBB2',

        cream_1: '#F0EDE4',
        cream_2: '#F5F2E8',
        cream_3: '#FAF8F4',

        danger: '#E04B4B',
        warning: '#FFCD4C',
        info: '#478CCA',

        neutral_1: '#545454',
        neutral_2p: '#9A9A9A',
        neutral_3: '#BEBEBE',
        neutral_4: '#D7D7D7',
        neutral_300: '#E1E1E1',

        black: '#000000',
        white: '#FFFFFF'
    },
    typography: {
        lineHeight: 1.5,
        headings: {
        // fontFamily: Poppins_700Bold,
        h1: {
            fontSize: 60
        },
        h2: {
            fontSize: 48
        },
        h3: {
            fontSize: 36
        },
        h4: {
            fontSize: 24
        },
        h5: {
            fontSize: 20
        },
      },
      subtitle: {
        // fontFamily: Poppins_600SemiBold,
        sub_1: {
            fontSize: 22,
        },
        sub_2: {
            fontSize: 18,
        },
        sub_3: {
            fontSize: 14,
        },
        sub_4: {
            fontSize: 10
        }
      },
      body: {
        // fontFamily: Poppins_400Regular,
        body_1: {
            fontSize: 14
        },
        body_2: {
            fontSize: 12
        },
        body_3: {
            fontSize: 10
        }
      }
    },
    shadows: {
        shadow_1: "0px 0px 6px rgba(190, 190, 190, 0.3)",
        shadow_2: "0px 0px 16px rgba(132, 132, 132, 0.25)",
        shadow_3: "0px 0px 32px rgba(132, 132, 132, 0.25)"
    }
};
  
export default MyTheme;