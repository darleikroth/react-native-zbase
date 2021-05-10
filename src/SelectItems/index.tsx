import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Color from "color";

const ios = Platform.OS === "ios";

type Payload = {
  id: number;
  name: string;
};

type Item = {
  item: any;
  index: number;
};

export type SelectOptions = {
  itemFunc?(item: any): string;
  onLongPress?(item: any): void;
  onPress?(item: any): void;
  title?: string;
  values?: Payload[] | any[];
};

interface Props {
  statusBarColor?: string;
  options?: SelectOptions | null;
  onClose?(): void;
}

export const SelectItems: React.FC<Props> = (props) => {
  const screen = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState<Payload[]>([]);
  const [title, setTitle] = useState("Selecione");
  const options = useRef<SelectOptions | null | undefined>(null);

  useEffect(() => {
    options.current = props.options;
    if (props.options) {
      setValues(props.options?.values || []);
      setTitle(props.options.title || "Selecione");
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [props.options]);

  const onRequestClose = () => {
    options.current?.onPress?.(null);
    props.onClose?.();
  };

  const onPress = (item: any) => {
    options.current?.onPress?.(item);
    props.onClose?.();
  };

  const onLongPress = (item: any) => {
    options.current?.onLongPress?.(item);
    props.onClose?.();
  };

  const renderItem = ({ item }: Item) => {
    const title = options.current?.itemFunc?.(item);

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        onLongPress={() => onLongPress(item)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderList = () => {
    const loading = visible && (values.length === 0);

    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={loading}
            size="large"
          />
        </View>
      );
    }

    return (
      <FlatList
        data={values}
        keyExtractor={(_, key) => `select-${key}`}
        renderItem={renderItem}
      />
    );
  };

  const renderContent = () => {
    const loading = visible && (values.length === 0);
    const size = values.length;
    const dialogHeight = size < 10 ? (size * 48) + 72 : (9 * 48) + 72;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => null}>
          <View
            style={[
              styles.dialog,
              { width: screen.width - 64 },
              { height: loading ? 128 : dialogHeight },
            ]}
          >
            <View style={styles.titleContent}>
              <Text style={styles.title}>
                {title}
              </Text>
            </View>
            {renderList()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <>
        <StatusBar
          backgroundColor={`${Color(props.statusBarColor).darken(0.6)}`}
        />
        <TouchableWithoutFeedback onPress={onRequestClose}>
          {renderContent()}
        </TouchableWithoutFeedback>
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .6)",
  },
  dialog: {
    paddingTop: 8,
    paddingBottom: 16,
    borderRadius: 3,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 8 * .75,
        shadowOffset: { height: 8 * .75, width: 0 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  titleContent: {
    height: 48,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  title: {
    color: "#212121",
    fontSize: ios ? 16 : 17,
    fontWeight: "bold",
  },
  itemContent: {
    height: 48,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  itemText: {
    color: "#212121",
    fontSize: ios ? 16 : 17,
  },
  loading: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectItems;
