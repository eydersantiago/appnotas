@echo off
echo Applying Kubernetes YAML files...

kubectl apply -f auth/auth_deployment.yaml
kubectl apply -f journal/journal_deployment.yaml
kubectl apply -f user/user_deployment.yaml
kubectl apply -f orquestador/orquestador_deployment.yaml

echo All YAML files have been applied.
pause
