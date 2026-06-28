import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';

export default function CompleteCallScreen({ route, navigation }) {
  const { callId } = route.params;
  const [observations, setObservations] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [photos, setPhotos] = useState([]);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);
  const signatureRef = React.useRef(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!observations.trim()) {
      Alert.alert('Erro', 'Preencha as observações');
      return;
    }

    if (photos.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma foto');
      return;
    }

    setLoading(true);
    try {
      await api.createCompletionReport(callId, {
        observations,
        materialsUsed,
        photos,
        signature,
      });

      Alert.alert('Sucesso', 'Chamado finalizado com sucesso', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ServiceCallsList'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao finalizar chamado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações do Serviço</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o trabalho realizado..."
          value={observations}
          onChangeText={setObservations}
          multiline
          numberOfLines={4}
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Materiais Utilizados</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Cimento, areia, tinta..."
          value={materialsUsed}
          onChangeText={setMaterialsUsed}
          multiline
          numberOfLines={2}
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fotos do Serviço</Text>
        <View style={styles.photoButtonsContainer}>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={takePhoto}
            disabled={loading}
          >
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
            <Text style={styles.photoButtonText}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={pickImage}
            disabled={loading}
          >
            <MaterialIcons name="image" size={20} color="#fff" />
            <Text style={styles.photoButtonText}>Galeria</Text>
          </TouchableOpacity>
        </View>

        {photos.length > 0 && (
          <FlatList
            data={photos}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.photoItem}>
                <Image source={{ uri: item }} style={styles.photoImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePhoto(index)}
                >
                  <MaterialIcons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.photoGrid}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assinatura (Opcional)</Text>
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureText}>
            Recurso de assinatura disponível em breve
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialIcons name="check" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Finalizar Chamado</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  photoGrid: {
    gap: 8,
  },
  photoItem: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 4,
  },
  signatureContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  signatureText: {
    color: '#999',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#10B981',
    margin: 12,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
