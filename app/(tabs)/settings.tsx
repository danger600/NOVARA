import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useI18n, type Locale } from "@/lib/i18n";
import { theme } from "@/constants/theme";

export default function SettingsScreen() {
  const { locale, setLocale, messages, isReady, storageError } = useI18n();
  const languages: { code: Locale; native: string; english: string }[] = [
    { code: "en", native: messages.settings.english, english: "English" },
    { code: "rw", native: messages.settings.kinyarwanda, english: "Kinyarwanda" },
    { code: "fr", native: messages.settings.french, english: "Français" },
  ];
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.brand}><Ionicons name="aperture" size={22} color={theme.colors.goldDeep}/><Text style={styles.brandText}>NOVARA</Text></View>
    <Text style={styles.kicker}>{messages.settings.kicker}</Text><Text style={styles.title}>{messages.settings.title}</Text><Text style={styles.sub}>{messages.settings.subtitle}</Text>
    {languages.map((language) => <Pressable key={language.code} onPress={() => { void setLocale(language.code); }} disabled={!isReady} style={styles.option} accessibilityRole="radio" accessibilityState={{ selected: locale === language.code }}>
      <View style={{flex:1}}><Text style={styles.language}>{language.native}</Text><Text style={styles.english}>{language.english}</Text></View>
      <Ionicons name={locale === language.code ? "radio-button-on" : "radio-button-off"} size={21} color={locale === language.code ? theme.colors.goldDeep : theme.colors.muted}/>
    </Pressable>)}
    <View style={styles.notice}><Ionicons name="phone-portrait-outline" size={18} color={theme.colors.navy}/><Text style={styles.noticeText}>{messages.settings.saved}</Text></View>
    {!isReady && <Text style={styles.status}>{messages.common.loading}</Text>}
    {storageError && <Text accessibilityRole="alert" style={styles.error}>{messages.settings.savingFailed}</Text>}
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:theme.colors.background},content:{padding:22,gap:14,width:"100%",maxWidth:760,alignSelf:"center"},
  brand:{flexDirection:"row",alignItems:"center",gap:9,marginBottom:12},brandText:{fontSize:15,fontWeight:"900",letterSpacing:2,color:theme.colors.navy},
  kicker:{fontSize:10,fontWeight:"900",letterSpacing:2,color:theme.colors.goldDeep},title:{fontSize:30,fontWeight:"900",color:theme.colors.navy},
  sub:{fontSize:13,color:theme.colors.muted,marginBottom:8},option:{backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.border,borderRadius:15,padding:16,flexDirection:"row",alignItems:"center"},
  language:{fontSize:14,fontWeight:"800",color:theme.colors.text},english:{fontSize:11,color:theme.colors.muted,marginTop:4},
  notice:{flexDirection:"row",gap:10,padding:14,borderRadius:14,backgroundColor:"#E9F0FA"},noticeText:{flex:1,color:theme.colors.navy,fontSize:11,lineHeight:17},
  status:{fontSize:11,color:theme.colors.muted},error:{fontSize:11,color:theme.colors.danger,lineHeight:17},
});
