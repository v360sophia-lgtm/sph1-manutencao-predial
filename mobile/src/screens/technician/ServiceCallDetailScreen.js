import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { useServiceCallStore } from '../../store/serviceCallStore';

export default function ServiceCallDetailScreen({ route, navigation }) {
  const { callId } = route.params;
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedServiceCall } = useServiceCallStore();

  useEffect(() => {
    loadCallDetail();
  }, [callId]);

  const loadCallDetail = async () => {
    try {
      setLoading(true);
      const response = await api.getServiceCallDetail(callId);
      setCall(response.data);
      setSelectedServiceCall(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar detalhes do chamado');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWork = async () => {
    try {
      await api.updateServiceCall(callId, { status: 'in_progress' });
      Alert.alert('Sucesso', 'Chamado iniciado');
      loadCallDetail();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao iniciar chamado');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      in_progress: '#3B82F6',
      completed: '#10B981',
      cancelled: '#EF4444',
    };
    return colors[status] || '#999';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#EF4444',
    };
    return colors[priority] || '#999';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!call) {
    return (
      <View style={styles.container}>
        <Text>Chamado não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.callId}>Chamado #{call.id}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(call.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {call.status === 'pending'
                ? 'Pendente'
                : call.status === 'in_progress'
                ? 'Em Progresso'
                : call.status === 'completed'
                ? 'Concluído'
                : 'Cancelado'}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{call.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="info" size={20} color="#2563EB" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Descrição</Text>
            <Text style={styles.infoValue}>{call.description}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="flag" size={20} color={getPriorityColor(call.priority)} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Prioridade</Text>
            <Text style={styles.infoValue}>
              {call.priority === 'low'
                ? 'Baixa'
                : call.priority === 'medium'
                ? 'Média'
                : 'Alta'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="calendar-today" size={20} color="#2563EB" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Criado em</Text>
            <Text style={styles.infoValue}>
              {new Date(call.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
      </View>

      {call.condominium && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Local</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="apartment" size={20} color="#2563EB" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Condomínio</Text>
              <Text style={styles.infoValue}>{call.condominium}</Text>
            </View>
          </View>
          {call.apartment && (
            <View style={styles.infoRow}>
              <MaterialIcons name="home" size={20} color="#2563EB" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Apartamento</Text>
                <Text style={styles.infoValue}>{call.apartment}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {call.status === 'pending' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleStartWork}
        >
          <MaterialIcons name="play-arrow" size={20} color="#fff" />
          <Text style={styles.buttonText}>Iniciar Trabalho</Text>
        </TouchableOpacity>
      )}

      {call.status === 'in_progress' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('CompleteCall', { callId: call.id })
          }
        >
          <MaterialIcons name="check" size={20} color="#fff" />
          <Text style={styles.buttonText}>Finalizar Chamado</Text>
        </TouchableOpacity>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2563EB',
    padding: 16,
    paddingTop: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  callId: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#10B981',
    margin: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spacer: {
    height: 20,
  },
});
