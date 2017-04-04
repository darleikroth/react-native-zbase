# react-native-zbase

Módulo que reúne componentes nativos customizados. O objetivo é facilitar a organização e manutenção dos componentes.

## Instalar

1. Antes de instalar este componente, instalar e configurar [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#installation).

2. Finalmente:

```
npm install --save github:darleikroth/react-native-zbase
```

## Os componentes

- [CardView](#cardview)
- [DatePicker](#datepicker)
- [Navbar](#navbar)
- [TouchableView](#touchableview)
- [ModalPicker](#modalpicker)
- [Drawer](#drawer)

## CardView

Cria um componente em forma de *card*, utilizando recursos nativos, funcionando bem em IOS e Android.

## DatePicker

Reúne os componentes [DatePickerIOS](https://facebook.github.io/react-native/docs/datepickerios.html#datepickerios) e [DatePickerAndroid](https://facebook.github.io/react-native/docs/datepickerandroid.html#datepickerandroid). Para IOS utiliza o componente [Modal](https://facebook.github.io/react-native/docs/modal.html#modal) para demonstrar o DatePickerIOS.

## Navbar

Cria a barra de navegação no topo. Layout projetado para IOS e para Material Design no Android (Toolbar).

## TouchableView

Reúne os componentes nativos [TouchableHighlight](https://facebook.github.io/react-native/docs/touchablehighlight.html#touchablehighlight) e [TouchableNativeFeedback](https://facebook.github.io/react-native/docs/touchablenativefeedback.html#touchablenativefeedback).

## ModalPicker

Implementado com base neste projeto [react-native-modal-picker](https://github.com/d-a-n/react-native-modal-picker), criado por [d-a-n](https://github.com/d-a-n).

## Drawer

Implementação que trabalha com o projeto [react-native-drawer](https://github.com/root-two/react-native-drawer), mantido por [Zack Story](https://github.com/rt2zz) e outros contribuidores.
